import { ScriptableTreeNode } from "./dto/ScriptableTreeNode.js"

export interface IScriptableTreeNodeFactory<T>
{
  child(nodes:Array<IScriptableTreeNodeFactory<any>>):IScriptableTreeNodeFactory<T>
  getNode():ScriptableTreeNode<T>
}