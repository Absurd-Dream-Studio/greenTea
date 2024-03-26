import { Container } from "inversify";
import { GestureContext } from "../GestureContext.js";
import { CollisionMap } from "@Src/collision/systemResource/CollisionMap.js";
import { getEntityInPoint } from "@Src/collision/utils/CollisionMapUtils.js";

export const GestureCollisionMapSetup = {
    setup(diContainer: Container) {
        const context = diContainer.get(GestureContext)
        const collisionMap = diContainer.get(CollisionMap)

        context.fetchInPointEntities = (worldX: number, worldY: number) => {
            return [...getEntityInPoint(
                worldX,
                worldY,
                collisionMap
            )]
        }
    }
}