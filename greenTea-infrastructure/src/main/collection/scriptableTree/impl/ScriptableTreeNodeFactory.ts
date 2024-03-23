import { ScriptableTreeNode } from "../dto/ScriptableTreeNode.js";
import { IScriptableTreeNodeFactory } from "../IScriptableTreeNodeFactory.js";
import { IScriptableTreeNodeDataFactory } from "../IScriptableTreeNodeDataFactory.js";

export class ScriptableTreeNodeFactory<PropertyType,T> implements IScriptableTreeNodeFactory<T>
{
  private nodeFactories:Array<IScriptableTreeNodeFactory<any>>
  private node:IScriptableTreeNodeDataFactory<PropertyType,T>

  constructor(node:IScriptableTreeNodeDataFactory<PropertyType,T>)
  {
    this.node = node
  }

  child(nodes: IScriptableTreeNodeFactory<any>[]): IScriptableTreeNodeFactory<T> {
    this.nodeFactories = nodes
    return this;
  }
  getNode(): ScriptableTreeNode<T> {
    let result:ScriptableTreeNode<T> = {
      parent:undefined,
      data: this.node.getInstance(),
      child : []
    }

    if(!this.nodeFactories)
    {
      return result
    }

    this.nodeFactories.forEach(item => {
      let child = item.getNode()
      child.parent = result
      result.child.push(child)
    })
    return result
  }
}