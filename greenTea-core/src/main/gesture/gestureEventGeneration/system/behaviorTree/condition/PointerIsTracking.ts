import Predicate from "greentea-infrastructure/ai/behaviorTree/tags/execution/Predicate";
import { GestureBtContext } from "../GestureBtContext.js";
import { BTNodeResultEnum } from "greentea-infrastructure/ai/behaviorTree/BTNodeResultEnum";

export default Predicate<GestureBtContext>(context =>{
    let pointer = context.pointEvent
    return context.pointerMap.has(pointer.pointerId)
})