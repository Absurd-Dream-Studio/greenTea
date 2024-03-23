import Action from "greentea-infrastructure/ai/behaviorTree/tags/execution/Action";
import { GestureBtContext } from "../GestureBtContext.js";
import { BTNodeResultEnum } from "greentea-infrastructure/ai/behaviorTree/BTNodeResultEnum";
import { getDistance } from "greentea-infrastructure/math/CommonMathUtils";

export default function (distance: number) {
    return Action<GestureBtContext>(context=>{
        let pointer = context.pointEvent
        let pointerMapValue = context.pointerMap.get(pointer.pointerId)

        let dis = getDistance(
            pointer.clientX,
            pointer.clientY,
            pointerMapValue.screenX,
            pointerMapValue.screenY
        )

        if(dis > distance)
        {
            pointerMapValue.canTriggerLongPress = false
        }

        return BTNodeResultEnum.SUCCESS
    })
}