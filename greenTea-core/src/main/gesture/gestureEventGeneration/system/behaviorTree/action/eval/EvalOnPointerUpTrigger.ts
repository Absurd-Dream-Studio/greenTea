import Action from "greentea-infrastructure/ai/behaviorTree/tags/execution/Action"
import { GestureBtContext } from "../../GestureBtContext.js"
import { BTNodeResultEnum } from "greentea-infrastructure/ai/behaviorTree/BTNodeResultEnum"
import { GestureEventTriggerComponent, GestureEventTriggerEventEnum } from "@Src/gesture/gestureEventTrigger/GestureEventTriggerComponent.js"

export default Action<GestureBtContext>(context => {
    const pointer = context.pointEvent
    const entity = context.pointerMap.get(pointer.pointerId).firstClickEntity

    if(!entity) return BTNodeResultEnum.SUCCESS

    const triggerCom = entity.components.get(GestureEventTriggerComponent)

    if(!triggerCom) return BTNodeResultEnum.SUCCESS

    triggerCom.eventListener.evalListener(GestureEventTriggerEventEnum.ON_POINTER_UP, {
        id: pointer.pointerId,
        x: pointer.clientX,
        y: pointer.clientY,
    })

    return BTNodeResultEnum.SUCCESS
})