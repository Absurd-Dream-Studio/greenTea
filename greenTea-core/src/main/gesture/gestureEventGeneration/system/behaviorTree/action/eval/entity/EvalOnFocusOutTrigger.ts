import Action from "greentea-infrastructure/ai/behaviorTree/tags/execution/Action";
import { GestureBtContext } from "../../../GestureBtContext.js";
import { BTNodeResultEnum } from "greentea-infrastructure/ai/behaviorTree/BTNodeResultEnum";
import { GestureEventTriggerComponent, GestureEventTriggerEventEnum } from "@Src/gesture/gestureEventTrigger/GestureEventTriggerComponent.js";

export default Action<GestureBtContext>(context=>{
    let entity = context.focusInEntity
    let pointer = context.pointEvent

    if(!entity)
    {
        return BTNodeResultEnum.SUCCESS
    }

    let triggerCom = entity.components.get(GestureEventTriggerComponent)

    if(!triggerCom)
    {
        return BTNodeResultEnum.SUCCESS
    }

    triggerCom.eventListener.evalListener(GestureEventTriggerEventEnum.ON_FOCUS_OUT,{
        id: pointer.pointerId,
        clientX: pointer.clientX,
        clientY: pointer.clientY
    })

    return BTNodeResultEnum.SUCCESS
})