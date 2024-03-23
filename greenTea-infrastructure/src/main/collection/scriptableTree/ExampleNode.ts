import DefaultTreeNodeDecorateBehavior from "./impl/DefaultTreeNodeDecorateBehavior.js";
import { IScriptableTreeNodeDecorateInterface } from "./IScriptableTreeNodeDecorateInterface.js";
import { IScriptableTreeNodeDataFactory } from "./IScriptableTreeNodeDataFactory.js";


const decorate:IScriptableTreeNodeDecorateInterface<ExampleNodeProperty,ExampleNodeData> = function (property,child)
{
  return DefaultTreeNodeDecorateBehavior(property,child,new ExampleNodeDataFactory())
}

export default decorate;

export class ExampleNodeData
{
}

export type ExampleNodeProperty = {
}

export class ExampleNodeDataFactory implements IScriptableTreeNodeDataFactory<ExampleNodeData,ExampleNodeProperty>
{
  setProperty(v: ExampleNodeProperty): IScriptableTreeNodeDataFactory<ExampleNodeData, ExampleNodeProperty> {
    throw new Error("Method not implemented.");
  }
  getInstance(): ExampleNodeData {
    throw new Error("Method not implemented.");
  }
}