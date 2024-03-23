import Action from "greentea-infrastructure/ai/behaviorTree/tags/execution/Action";
import { GestureBtContext } from "../GestureBtContext.js";
import { BTNodeResultEnum } from "greentea-infrastructure/ai/behaviorTree/BTNodeResultEnum";

export default Action<GestureBtContext>(context => {

    context.pointerMap.forEach((v,k,m)=>{
        v.updated = false
    })
    return BTNodeResultEnum.SUCCESS
})