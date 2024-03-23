import Action from "greentea-infrastructure/ai/behaviorTree/tags/execution/Action";
import { GestureBtContext } from "../GestureBtContext.js";
import { BTNodeResultEnum } from "greentea-infrastructure/ai/behaviorTree/BTNodeResultEnum";

export default Action<GestureBtContext>(context => {

    const pointer = context.pointEvent
    context.pointerMap.set(pointer.pointerId, {
        id: pointer.pointerId,
        startTime: Date.now(),
        startScreenX: pointer.clientX,
        startScreenY: pointer.clientY,
        firstClickEntity: context.foucsEntity,
        screenX: pointer.clientX,
        screenY: pointer.clientY,
        updated: true,
        canTriggerLongPress:true
    })

    return BTNodeResultEnum.SUCCESS
})