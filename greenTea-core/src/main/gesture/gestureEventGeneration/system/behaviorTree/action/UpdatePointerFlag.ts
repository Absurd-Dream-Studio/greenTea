import Action from "greentea-infrastructure/ai/behaviorTree/tags/execution/Action";
import { GestureBtContext } from "../GestureBtContext.js";
import { BTNodeResultEnum } from "greentea-infrastructure/ai/behaviorTree/BTNodeResultEnum";

export default Action<GestureBtContext>(context => {

    let pointer = context.pointEvent
    let pointerMapValue = context.pointerMap.get(pointer.pointerId)

    if (pointerMapValue) {
        pointerMapValue.updated = true
    }
    return BTNodeResultEnum.SUCCESS
})