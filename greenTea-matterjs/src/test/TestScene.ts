import { MatterJsComponent } from "@Src/component/MatterJsComponent.js";
import { MatterJsContext } from "@Src/MatterJsContext.js";
import { Position } from "greentea-core/common/component/Position";
import { Transformation } from "greentea-core/common/component/Transformation";
import { EntityLifecycleComponent, EntityLifecycleEventEnum } from "greentea-core/entity/entityLifecycle/EntityLifeCycleComponent";
import { GestureEventTriggerComponent, GestureEventTriggerEventEnum } from "greentea-core/gesture/gestureEventTrigger/GestureEventTriggerComponent";
import { SceneBase } from "greentea-core/scene/SceneBase";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { PixiComponent } from "greentea-pixijs/component/PixiComponent";
import { inject, injectable } from "inversify";
import * as Matter from "matter-js";
import * as PIXI from "pixi.js"

@injectable()
export class TestScene extends SceneBase {
    private ec: IEntityCollection
    private matterJsContext: MatterJsContext

    constructor(
        @inject(TypeConfiguration.TYPES.IEntityCollection)
        ec: IEntityCollection,
        matterJsContext: MatterJsContext
    ) {
        super()
        this.ec = ec
        this.matterJsContext = matterJsContext
    }

    OnStart(): void {

        console.debug("add entity")
        this.matterJsContext.engine.gravity.y = 0

        const createEntityComs = (setComs: (coms: {
            pos: Position,
            tran: Transformation,
            pixiCom: PixiComponent<HitProperty>,
            lifeCom: EntityLifecycleComponent,
            matterJsComponent: MatterJsComponent,
            gestureEventTriggerComponent: GestureEventTriggerComponent
        }) => void) => {
            const coms = {
                pos: new Position(),
                tran: new Transformation(),
                pixiCom: new PixiComponent<HitProperty>(),
                lifeCom: new EntityLifecycleComponent(),
                matterJsComponent: new MatterJsComponent(),
                gestureEventTriggerComponent: new GestureEventTriggerComponent
            }

            // random number in range (100 , 200)

            // coms.pos.x = 100
            // coms.pos.y = 100
            setComs(coms)

            coms.pixiCom.property = { hit: false }
            coms.pixiCom.node = {
                displayObj: new PIXI.Graphics(),
                render: (displayObj: PIXI.Graphics, property) => {

                    if (property.hit) {
                        displayObj.clear()
                            .beginFill("red")
                            .drawRect(-50, -50, 100, 100)
                            .endFill()
                    } else {
                        displayObj.clear()
                            .beginFill("black")
                            .drawRect(-50, -50, 100, 100)
                            .endFill()
                    }
                }
            }

            {
                const com = coms.matterJsComponent
                com.body.setBody(Matter.Bodies.rectangle(50, 50, 100, 100, { isSensor: true }))
            }

            {
                const el = coms.gestureEventTriggerComponent.eventListener

                el.addListener(GestureEventTriggerEventEnum.ON_CLICK, (v) => {
                })

                el.addListener(GestureEventTriggerEventEnum.ON_MOVE, (v) => {
                    coms.pos.x = v.x
                    coms.pos.y = v.y
                })

                el.addListener(GestureEventTriggerEventEnum.ON_RELEASE, (v) => {
                })
            }

            {
                const el = coms.lifeCom.eventListener
                el.addListener(EntityLifecycleEventEnum.ON_UPDATE, (v) => {
                    console.debug(coms.matterJsComponent.collisionSet.size)
                    if (coms.matterJsComponent.collisionSet.size > 0) {
                        coms.pixiCom.property.hit = true
                    } else {
                        coms.pixiCom.property.hit = false
                    }
                })
            }
            return Object.values(coms)
        }

        this.ec.AddEntity(createEntityComs(coms => {
            coms.pos.x = 100
            coms.pos.y = 100
        }))
        this.ec.AddEntity(createEntityComs(coms => {
            coms.pos.x = 300
            coms.pos.y = 200
        }
        ))
    }

    OnExit(): void {
    }
}

type HitProperty = {
    hit: boolean
}