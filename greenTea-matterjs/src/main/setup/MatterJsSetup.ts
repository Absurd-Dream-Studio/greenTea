import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { EntityCollectionEventEnum } from "greentea-infrastructure/ecs/entity/EntityCollectionEventEnum";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { Container } from "inversify";
import { MatterJsComponent } from "../component/MatterJsComponent.js";
import { MatterJsBodyEventEnum } from "../types/MatterJsBodyContainer.js";
import { MatterJsContext } from "../MatterJsContext.js";
import * as Matter from "matter-js";

export const MatterJsSetup = {
    diSetup(diContainer: Container) {
        diContainer.bind(MatterJsContext).toSelf().inSingletonScope()
    },
    setup(diContainer: Container) {
        const ec = diContainer.get<IEntityCollection>(TypeConfiguration.TYPES.IEntityCollection)
        const context = diContainer.get(MatterJsContext)
        {
            const el = ec.GetListenerManager();
            el.addListener(EntityCollectionEventEnum.CREATE, (e) => {
                const com = e.components.get(MatterJsComponent)

                if (!com) {
                    return
                }

                com.body.getListenerManager().addListener(MatterJsBodyEventEnum.BODY_CHANGED, (v) => {
                    if (v.oldBody) {
                        Matter.Composite.remove(context.engine.world, v.oldBody)
                        context.bodyEntityMap.delete(v.oldBody.id)
                    }

                    if (v.newBody) {
                        Matter.Composite.add(context.engine.world, v.newBody)
                        console.debug('new id ' + v.newBody.id)
                        context.bodyEntityMap.set(v.newBody.id, e.entityId)
                    }
                })
            })

            el.addListener(EntityCollectionEventEnum.DESTROY, (e) => {
                const com = e.components.get(MatterJsComponent)
                if (!com) {
                    return
                }
                const body = com.body.getBody()

                if (body) {
                    Matter.Composite.remove(context.engine.world, body)
                    context.bodyEntityMap.delete(body.id)
                }
            })
        }

        {
            Matter.Events.on(context.engine, "collisionActive", (v) => {
                v.pairs.forEach((pair) => {
                    const minBodyId = Math.min(pair.bodyA.id, pair.bodyB.id)
                    let arr = context.collisionActiveMap.get(minBodyId)
                    if (!arr) {
                        arr = []
                        context.collisionActiveMap.set(minBodyId, arr)
                    }
                    arr.push(Math.max(pair.bodyA.id, pair.bodyB.id))
                })
            })
        }
    }
}