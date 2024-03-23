import { IScriptableTreeNodeFactory } from "./IScriptableTreeNodeFactory.js";

export interface IScriptableTreeNodeDecorateInterface<PropertyType,NodeType> {
    (property:PropertyType, child?:Array<IScriptableTreeNodeFactory<any>>): IScriptableTreeNodeFactory<NodeType>
}