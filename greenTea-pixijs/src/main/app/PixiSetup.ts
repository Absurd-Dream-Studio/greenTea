import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { Container } from "inversify";
import { PixiContext } from "../PixiContext.js";
import { EntityCollectionEventEnum } from "greentea-infrastructure/ecs/entity/EntityCollectionEventEnum";
import { PixiComponent } from "../component/PixiComponent.js";
import { PixiUtils } from "../PixiUtils.js";
import { ISystemScope } from "greentea-infrastructure/app/ecs/system/ISystemScope";
import { SystemTypeEnum } from "greentea-infrastructure/app/ecs/system/SystemTypeEnum";
import { PixiRenderSystem } from "@Src/system/PixiRenderSystem.js";
import { PixiValueMappingSystem } from "@Src/system/PixiValueMappingSystem.js";
import { IApplicationOptions } from "pixi.js";
import * as PIXI from "pixi.js"

export const PixiSetup = {
    diSetup(diContainer: Container) {
        diContainer.bind(PixiContext).toSelf().inSingletonScope()
    },
    setup(diContainer: Container,
        config:{
            appConfig?:Partial<IApplicationOptions>
        }
        ) {
        const ec = diContainer.get<IEntityCollection>(TypeConfiguration.TYPES.IEntityCollection)
        const pixiContext = diContainer.get(PixiContext)
        const mainCanvas = diContainer.get<HTMLCanvasElement>(TypeConfiguration.TYPES.Canvas)

        {
            pixiContext.app = new PIXI.Application({
                view: mainCanvas,
                backgroundAlpha: 0,
                antialias: true,
                resolution: window.devicePixelRatio || 1,
                ...config.appConfig,
            })
            pixiContext.mainContainer = new PIXI.Container()
            pixiContext.mainContainer.sortableChildren = true
            pixiContext.app.stage.addChild(pixiContext.mainContainer)
            pixiContext.app.renderer.background.color = "#316687"
        }


        // entity_collection_event_setup
        {
            const el = ec.GetListenerManager()

            el.addListener(EntityCollectionEventEnum.CREATE, (entity) => {
                let com = entity.components.get(PixiComponent)
                if (!com) {
                    return
                }

                let pixiContext = diContainer.get(PixiContext)

                if(com.node.displayObj)
                {
                    com.container.addChild(com.node.displayObj)
                }

                if (!entity.parent) {
                    pixiContext.mainContainer.addChild(com.container)
                }
                if (entity.parent) {
                    let parentPixiCom = entity.parent.components.get(PixiComponent)
                    if (!parentPixiCom.container.destroyed) {
                        parentPixiCom.container.addChild(com.container)
                    }
                }

                PixiUtils.MapValue(entity)
            })

            el.addListener(EntityCollectionEventEnum.DESTROY, (entity) => {
                let com = entity.components.get(PixiComponent)
                if (!com) {
                    return
                }
                if (!com.container.destroyed) {
                    com.container.destroy({
                        children: true,
                    })
                    // com.container.destroy(true)
                }
            })
        }
        // entity_collection_event_setup

        {
            new ResizeObserver(() => {
                mainCanvas.width = mainCanvas.getBoundingClientRect().width
                mainCanvas.height = mainCanvas.getBoundingClientRect().height
                pixiContext.app.screen.width = mainCanvas.width
                pixiContext.app.screen.height = mainCanvas.height
            }).observe(mainCanvas)
        }
    },
    systemSetup(scope: ISystemScope, diContainer: Container) {
        scope.addSystemAfter(SystemTypeEnum.FRAME_UPDATE, undefined, [
            diContainer.resolve(PixiValueMappingSystem),
            diContainer.resolve(PixiRenderSystem)
        ])
    }
}