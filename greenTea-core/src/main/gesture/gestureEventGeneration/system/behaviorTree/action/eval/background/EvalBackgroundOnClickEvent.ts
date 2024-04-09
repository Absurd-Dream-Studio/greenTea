import Action from "greentea-infrastructure/ai/behaviorTree/tags/execution/Action";
import { GestureBtContext } from "../../../GestureBtContext.js";
import { BTNodeResultEnum } from "greentea-infrastructure/ai/behaviorTree/BTNodeResultEnum";
import { GestureEventTriggerEventEnum } from "@Src/gesture/gestureEventTrigger/GestureEventTriggerComponent.js";

export default Action<GestureBtContext>(context => {
    const pointer = context.pointEvent
    context.gestureContext.backgroundEventListener.evalListener(GestureEventTriggerEventEnum.ON_CLICK, {
        id: pointer.pointerId,
        clientX: pointer.clientX,
        clientY: pointer.clientY,
    })
    return BTNodeResultEnum.SUCCESS
})