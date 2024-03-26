import { GestureContext } from "greentea-core/gesture/gestureEventGeneration/GestureContext";
import { Container } from "inversify";
import { MatterJsContext } from "../MatterJsContext.js";
import * as Matter from "matter-js";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";

export const MatterJsGestureSetup = {
    setup(diContainer: Container) {
        const matterJsContext = diContainer.get(MatterJsContext)
        const gestureContext = diContainer.get(GestureContext)
        const ec = diContainer.get<IEntityCollection>(TypeConfiguration.TYPES.IEntityCollection)

        gestureContext.fetchInPointEntities = (worldX: number, worldY: number) => {
            const inPointBodies = Matter.Query.point(matterJsContext.engine.world.bodies, { x: worldX, y: worldY })
            const result = inPointBodies.map(body => {

                const entityId = matterJsContext.bodyEntityMap.get(body.id)
                const entity = ec.GetEntityById(entityId)

                if (entity) {
                    return entity
                }
                return undefined
            })
                .filter(entity => entity !== undefined)
            // console.debug(result)
            return result
        }
    }
}