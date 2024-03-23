import { IScriptableTreeNodeFactory } from "@Src/collection/scriptableTree/IScriptableTreeNodeFactory.js";
import { BTNodeResultEnum } from "./BTNodeResultEnum.js";
import { BTNodeDataType } from "./types/BTNodeDataType.js";
import { ScriptableTreeNode } from "@Src/collection/scriptableTree/dto/ScriptableTreeNode.js";
import { BTNodeType } from "./types/BTNodeType.js";

export function execute<T>(context: T, root: BTNodeType<T>) {
    root.data.execute(context, root.child)
}