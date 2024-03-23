import { BTNodeResultEnum } from "greentea-infrastructure/ai/behaviorTree/BTNodeResultEnum";
import Action from "greentea-infrastructure/ai/behaviorTree/tags/execution/Action";
import { GestureBtContext } from "../GestureBtContext.js";
import { getEntityInPoint } from "@Src/collision/utils/CollisionMapUtils.js";

export default Action((context: GestureBtContext) => {
    context.inPointEntities = [...getEntityInPoint(
        context.pointEvent.worldX,
        context.pointEvent.worldY,
        context.collisionMap
    )]
    return BTNodeResultEnum.SUCCESS
})