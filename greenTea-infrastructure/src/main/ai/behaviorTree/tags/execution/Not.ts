import { BTNodeResultEnum } from "../../BTNodeResultEnum.js";
import { IBTNodeExecutor } from "../../IBTNodeExecutor.js";
import { BTNodeFactoryType } from "../../types/BTNodeFactoryType.js";
import BaseTag from "../BaseTag.js";

const decorate = function <T>(node: BTNodeFactoryType<T>) {
    return BaseTag<T>(
        {
            execute: NotExecutor
        }, [node])
}

export default decorate;

const NotExecutor: IBTNodeExecutor<any> = function (context, child) {
    let node = child[0];
    if (!node) {
        return BTNodeResultEnum.FAILURE;
    }

    const result = node.data.execute(context, node.child);

    if (result === BTNodeResultEnum.SUCCESS) {
        return BTNodeResultEnum.FAILURE;
    }
    else if (result === BTNodeResultEnum.FAILURE) {
        return BTNodeResultEnum.SUCCESS;
    }
    else {
        return result;
    }
}