import Predicate from "greentea-infrastructure/ai/behaviorTree/tags/execution/Predicate";
import { GestureBtContext, GestureProcessStateEnum } from "../GestureBtContext.js";

export default function (state:GestureProcessStateEnum) {
    return Predicate((context: GestureBtContext) => {
        return context.processState === state
    })
}