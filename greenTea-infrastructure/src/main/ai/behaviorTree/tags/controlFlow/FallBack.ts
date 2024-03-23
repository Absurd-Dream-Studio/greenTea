import { IScriptableTreeNodeFactory } from "@Src/collection/scriptableTree/IScriptableTreeNodeFactory.js";
import { BTNodeDataType } from "../../types/BTNodeDataType.js";
import { IBTNodeExecutor } from "../../IBTNodeExecutor.js";
import { BTNodeResultEnum } from "../../BTNodeResultEnum.js";
import { BTNodeFactoryType } from "../../types/BTNodeFactoryType.js";
import BaseTag from "../BaseTag.js";

const decorate = function <T>(child:BTNodeFactoryType<T>[]) {
    return BaseTag<T>(
        {
            execute: executor
        }, child)
}

export default decorate;

const executor: IBTNodeExecutor<any> = function (context, child) {
    for (let i = 0; i < child.length; i++) {
        const item = child[i];
        const result = item.data.execute(context, item.child);
        if (result === BTNodeResultEnum.SUCCESS) {
            return BTNodeResultEnum.SUCCESS;
        }else if ( result === BTNodeResultEnum.RUNNING) {
            return BTNodeResultEnum.RUNNING;
        }
    }
    return BTNodeResultEnum.FAILURE;
}
