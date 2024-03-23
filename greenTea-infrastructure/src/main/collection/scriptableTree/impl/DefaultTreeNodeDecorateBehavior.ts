import { ScriptableTreeNodeFactory } from "./ScriptableTreeNodeFactory.js";
import { IScriptableTreeNodeFactory } from "../IScriptableTreeNodeFactory.js";
import { IScriptableTreeNodeDataFactory } from "../IScriptableTreeNodeDataFactory.js";

export default function <Pt, T>(property:Pt, child: Array<IScriptableTreeNodeFactory<any>>,nodeFactory: IScriptableTreeNodeDataFactory<Pt, T>): IScriptableTreeNodeFactory<T> {
    nodeFactory.setProperty(property)
    var result = new ScriptableTreeNodeFactory<Pt,T>(nodeFactory);
    if (child) {
        result.child(child)
    }
    return result
}