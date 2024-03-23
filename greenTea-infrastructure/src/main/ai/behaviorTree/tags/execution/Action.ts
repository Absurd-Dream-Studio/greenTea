import { IScriptableTreeNodeFactory } from "@Src/collection/scriptableTree/IScriptableTreeNodeFactory.js";
import { BTNodeDataType } from "../../types/BTNodeDataType.js";
import { BTNodeResultEnum } from "../../BTNodeResultEnum.js";
import BaseTag from "../BaseTag.js";

const decorate = function<T>(execute:ActionExecutor<T>)
{
  return BaseTag<T>(
    {
        execute:execute
    })
}

export default decorate;

export interface ActionExecutor<T>
{
  (context:T):BTNodeResultEnum
}