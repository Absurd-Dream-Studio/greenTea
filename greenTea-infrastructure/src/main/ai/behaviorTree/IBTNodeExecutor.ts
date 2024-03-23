import { ScriptableTreeNode } from "@Src/collection/scriptableTree/dto/ScriptableTreeNode.js";
import { BTNodeResultEnum } from "./BTNodeResultEnum.js";
import { BTNodeDataType } from "./types/BTNodeDataType.js";
import { BTNodeType } from "./types/BTNodeType.js";

export interface IBTNodeExecutor<T>{
    (context:T,child:BTNodeType<T>[]):BTNodeResultEnum
}