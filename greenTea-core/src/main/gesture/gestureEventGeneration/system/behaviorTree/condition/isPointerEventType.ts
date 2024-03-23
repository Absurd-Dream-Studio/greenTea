import Predicate from "greentea-infrastructure/ai/behaviorTree/tags/execution/Predicate";
import { GestureBtContext } from "../GestureBtContext.js";

export default function (type: string) {
    return Predicate((context: GestureBtContext) =>
        context.pointEvent && context.pointEvent.type === type)

}