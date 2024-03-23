import { ScriptableTreeNode } from "../dto/ScriptableTreeNode.js";

export default {
    Transform<SrcData, DstData>(src: ScriptableTreeNode<SrcData>, cb: (data: SrcData) => DstData): ScriptableTreeNode<DstData> {
        let result: ScriptableTreeNode<DstData> = {
            data: undefined,
            parent: undefined,
            child: []
        }

        let tranArr: ScriptableTreeNode<DstData>[] = [result]
        let arr = [src]

        while (arr.length > 0) {
            let _tranNode = tranArr.shift()
            let _node = arr.shift()

            _tranNode.data = cb(_node.data)
            _tranNode.child = _node.child.map(() => ({
                data: undefined,
                parent: _tranNode,
                child: undefined
            }))

            arr.push(..._node.child)
            tranArr.push(..._tranNode.child)
        }

        return result
    }
}