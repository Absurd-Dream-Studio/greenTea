import { ScriptableTreeNode } from "@Src/collection/scriptableTree/dto/ScriptableTreeNode.js";
import { BTNodeDataType } from "./BTNodeDataType.js";

export type BTNodeType<T> = ScriptableTreeNode<BTNodeDataType<T>>