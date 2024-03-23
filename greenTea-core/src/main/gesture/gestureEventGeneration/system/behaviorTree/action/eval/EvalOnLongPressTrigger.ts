import Action from "greentea-infrastructure/ai/behaviorTree/tags/execution/Action"
import { GestureBtContext } from "../../GestureBtContext.js"
import { BTNodeResultEnum } from "greentea-infrastructure/ai/behaviorTree/BTNodeResultEnum"
import { GestureEventTriggerComponent, GestureEventTriggerEventEnum } from "@Src/gesture/gestureEventTrigger/GestureEventTriggerComponent.js"

export default function (detectTime: number) {
    return Action<GestureBtContext>(context => {
        context.pointerMap.forEach((v, k, m) => {
            if (Date.now() - v.startTime > detectTime && v.canTriggerLongPress) {
                v.canTriggerLongPress = false

                if (v.firstClickEntity) {
                    const triggerCom = v.firstClickEntity.components.get(GestureEventTriggerComponent)

                    if (triggerCom) {
                        triggerCom
                            .eventListener
                            .evalListener(
                                GestureEventTriggerEventEnum.ON_LONG_PRESS,
                                {
                                    id: v.id,
                                    x: v.screenX,
                                    y: v.screenY,
                                }
                            )
                    }

                }
            }
        })
        return BTNodeResultEnum.SUCCESS
    })
}
