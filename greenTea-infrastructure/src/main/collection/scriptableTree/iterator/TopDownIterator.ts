import { IScriptableTreeNodeIterateCallBack, IScriptableTreeNodeIterator } from "../IScriptableTreeNodeIterator.js";
import { ScriptableTreeNode } from "../dto/ScriptableTreeNode.js";
import * as Collentions from "typescript-collections"

export class TopDownIterator<T> implements IScriptableTreeNodeIterator<T>
{
  private readonly rootNode:ScriptableTreeNode<T>

  constructor(node:ScriptableTreeNode<T>)
  {
    this.rootNode = node
  }

  Iterate(cb: IScriptableTreeNodeIterateCallBack<T>): void {
    let queue = new Collentions.Queue<ScriptableTreeNode<T>>()
    queue.enqueue(this.rootNode)

    while(!queue.isEmpty())
    {
      let item = queue.dequeue()
      let isContinue = cb(item)
      if(!isContinue)
      {
        return
      }

      if(item.child && item.child.length > 0)
      {
        item.child.forEach(item => queue.enqueue(item))
      }
    }
  }
}