export interface IScriptableTreeNodeDataFactory<PropertyType,Type> {
  setProperty(v:PropertyType):IScriptableTreeNodeDataFactory<PropertyType,Type>
  getInstance():Type
}