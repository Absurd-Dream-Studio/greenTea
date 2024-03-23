import { ScriptableTreeNode } from "./dto/ScriptableTreeNode.js";

export interface IScriptableTreeNodeIterator<T>
{
  Iterate(cb:IScriptableTreeNodeIterateCallBack<T>):void
}

// return true will continue , false will stop
export interface IScriptableTreeNodeIterateCallBack<T>
{
  (node:ScriptableTreeNode<T>):boolean
}
