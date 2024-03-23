import Action from "greentea-infrastructure/ai/behaviorTree/tags/execution/Action";
import { GestureBtContext } from "../GestureBtContext.js";
import { BTNodeResultEnum } from "greentea-infrastructure/ai/behaviorTree/BTNodeResultEnum";

export default Action<GestureBtContext>(context => {
    let pointer = context.pointEvent
    context.pointerMap.delete(pointer.pointerId)
    return BTNodeResultEnum.SUCCESS
})