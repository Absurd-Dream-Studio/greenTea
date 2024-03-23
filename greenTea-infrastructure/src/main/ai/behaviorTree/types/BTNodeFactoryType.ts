import { IScriptableTreeNodeFactory } from "@Src/collection/scriptableTree/IScriptableTreeNodeFactory.js";
import { BTNodeDataType } from "./BTNodeDataType.js";

export type BTNodeFactoryType<T> =IScriptableTreeNodeFactory<BTNodeDataType<T>>