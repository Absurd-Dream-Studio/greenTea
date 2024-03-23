import Predicate from "greentea-infrastructure/ai/behaviorTree/tags/execution/Predicate";
import { GestureBtContext } from "../GestureBtContext.js";

export default Predicate<GestureBtContext>(context => {
    return context.focusInEntity && context.ec.GetEntityById(context.focusInEntity.entityId) && true
})