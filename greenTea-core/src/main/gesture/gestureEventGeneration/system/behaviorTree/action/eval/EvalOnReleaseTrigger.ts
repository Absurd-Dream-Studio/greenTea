import Action from "greentea-infrastructure/ai/behaviorTree/tags/execution/Action"
import { GestureBtContext } from "../../GestureBtContext.js"
import { BTNodeResultEnum } from "greentea-infrastructure/ai/behaviorTree/BTNodeResultEnum"
import { GestureEventTriggerComponent, GestureEventTriggerEventEnum } from "@Src/gesture/gestureEventTrigger/GestureEventTriggerComponent.js"

export default Action<GestureBtContext>(context => {
    const pointer = context.pointEvent
    const entity = context.foucsEntity

    const triggerCom = entity.components.get(GestureEventTriggerComponent)

    triggerCom.eventListener.evalListener(GestureEventTriggerEventEnum.ON_RELEASE, {
        id: pointer.pointerId,
        x: pointer.clientX,
        y: pointer.clientY,
    })

    return BTNodeResultEnum.SUCCESS
})