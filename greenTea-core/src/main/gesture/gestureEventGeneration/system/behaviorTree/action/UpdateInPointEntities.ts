import { BTNodeResultEnum } from "greentea-infrastructure/ai/behaviorTree/BTNodeResultEnum";
import Action from "greentea-infrastructure/ai/behaviorTree/tags/execution/Action";
import { GestureBtContext } from "../GestureBtContext.js";

export default Action((context: GestureBtContext) => {
    context.inPointEntities = context.gestureContext.fetchInPointEntities(context.pointEvent.worldX, context.pointEvent.worldY)
    return BTNodeResultEnum.SUCCESS
})