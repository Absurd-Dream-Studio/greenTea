import { IScriptableTreeNodeIterateCallBack, IScriptableTreeNodeIterator } from "../IScriptableTreeNodeIterator.js";
import { ScriptableTreeNode } from "../dto/ScriptableTreeNode.js";
import * as Collections from "typescript-collections"


export class DFSIterator<T> implements IScriptableTreeNodeIterator<T>
{
  private readonly rootNode: ScriptableTreeNode<T>

  constructor(node: ScriptableTreeNode<T>) {
    this.rootNode = node
  }

  Iterate(cb: IScriptableTreeNodeIterateCallBack<T>): void {
    let stack:Collections.Stack<StackDto<T>> = new Collections.Stack()
    stack.push(this.InitStackDto(this.rootNode))
    while (!stack.isEmpty()) {
      let item = stack.peek()
      let dontHaveChild = (!item.data.child || item.data.child.length === 0)
      if (item.discovered ||
        dontHaveChild) {
        let isContinue = cb(item.data)
        if (!isContinue) {
          return
        }
        stack.pop()
      } else if (!dontHaveChild) {
        item.discovered = true
        for(let i = item.data.child.length - 1 ; i > -1 ; i--)
        {
          let child = item.data.child[i]
          stack.push(this.InitStackDto(child))
        }
      }
    }
  }

  private InitStackDto(data: ScriptableTreeNode<T>): StackDto<T> {
    return {
      discovered: false,
      data: data
    }
  }
}

type StackDto<T> = {
  discovered: boolean,
  data: ScriptableTreeNode<T>
}