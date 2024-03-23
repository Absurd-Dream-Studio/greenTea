import Predicate from "greentea-infrastructure/ai/behaviorTree/tags/execution/Predicate";
import { GestureBtContext } from "../GestureBtContext.js";
import { GestureEventTriggerComponent } from "@Src/gesture/gestureEventTrigger/GestureEventTriggerComponent.js";

export default Predicate<GestureBtContext>(context => {
    return context.foucsEntity.components.has(GestureEventTriggerComponent)
})