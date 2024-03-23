import { GestureContext } from "@Src/gesture/gestureEventGeneration/GestureContext.js";
import Predicate from "greentea-infrastructure/ai/behaviorTree/tags/execution/Predicate";
import { GestureBtContext } from "../GestureBtContext.js";

export default Predicate<GestureBtContext>(context => {
    return context.foucsEntity && true
})