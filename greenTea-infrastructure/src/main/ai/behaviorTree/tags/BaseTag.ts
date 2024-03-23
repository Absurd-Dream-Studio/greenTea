import { IScriptableTreeNodeDataFactory } from "@Src/collection/scriptableTree/IScriptableTreeNodeDataFactory.js";
import DefaultTreeNodeDecorateBehavior from "@Src/collection/scriptableTree/impl/DefaultTreeNodeDecorateBehavior.js";
import { IScriptableTreeNodeFactory } from "@Src/collection/scriptableTree/IScriptableTreeNodeFactory.js";
import { BTNodeFactoryType } from "../types/BTNodeFactoryType.js";
import { BTNodeDataType } from "../types/BTNodeDataType.js";

type DataFactoryType<T> = IScriptableTreeNodeDataFactory<BTNodeDataType<T>,BTNodeDataType<T>>

const decorate = function<T>(data:BTNodeDataType<T>,child?:BTNodeFactoryType<T>[]):BTNodeFactoryType<T>
{
  return DefaultTreeNodeDecorateBehavior(data,child,new TreeNodeDataFactoryWrapper())
}

export default decorate;

class TreeNodeDataFactoryWrapper<T> implements DataFactoryType<T>
{
  private data:BTNodeDataType<T>

  setProperty(v:BTNodeDataType<T>): DataFactoryType<T> {
    this.data = v
    return this
  }
  getInstance():BTNodeDataType<T> {
    return this.data;
  }
}