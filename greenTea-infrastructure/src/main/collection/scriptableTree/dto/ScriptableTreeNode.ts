export type ScriptableTreeNode<T> = {
  data:T,
  parent:ScriptableTreeNode<any>
  child:Array<ScriptableTreeNode<any>>
}