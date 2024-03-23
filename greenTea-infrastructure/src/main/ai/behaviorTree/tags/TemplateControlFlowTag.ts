import { IScriptableTreeNodeFactory } from "@Src/collection/scriptableTree/IScriptableTreeNodeFactory.js";
import { BTNodeDataType } from "../types/BTNodeDataType.js";
import BaseTag from "./BaseTag.js";

const decorate = function<T>(child:IScriptableTreeNodeFactory<BTNodeDataType<T>>[])
{
  return BaseTag(
    {
        execute:undefined
    },child)
}

export default decorate;
