import { ExampleNodeProperty, ExampleNodeData, ExampleNodeDataFactory } from "@Src/collection/scriptableTree/ExampleNode.js";
import DefaultTreeNodeDecorateBehavior from "@Src/collection/scriptableTree/impl/DefaultTreeNodeDecorateBehavior.js";
import { IScriptableTreeNodeDataFactory } from "@Src/collection/scriptableTree/IScriptableTreeNodeDataFactory.js";
import { IScriptableTreeNodeDecorateInterface } from "@Src/collection/scriptableTree/IScriptableTreeNodeDecorateInterface.js";

const decorate:IScriptableTreeNodeDecorateInterface<DivProperty,DivClass> = function (property,child)
{
  return DefaultTreeNodeDecorateBehavior(property,child,new DivClassFactory())
}

export default decorate;

export class DivClass{
  text:string
}

export type DivProperty = {
  text:string
}

export class DivClassFactory implements IScriptableTreeNodeDataFactory<DivProperty,DivClass>
{
  private property:DivProperty

  setProperty(v: DivProperty): IScriptableTreeNodeDataFactory<DivProperty, DivClass> {
    this.property = v
    return this
  }
  getInstance(): DivClass {
    let result = new DivClass()
    result.text = this.property.text
    return result
  }
}