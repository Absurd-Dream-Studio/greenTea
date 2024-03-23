import { Position } from "@Src/common/component/Position.js"
import { Transformation } from "@Src/common/component/Transformation.js"
import { CalculateLocalPos } from "@Src/common/utils/CalculateTransformUtils.js"
import { UpdateTransformUtils } from "@Src/common/utils/UpdateTransformUtils.js"
import { Entity } from "greentea-infrastructure/ecs/entity/Entity"
import { EntityCollection } from "greentea-infrastructure/ecs/entity/defaultImpl/EntityCollection"

export default {
    Test() {
        let ec = new EntityCollection()
        let testEntity:Entity = undefined;
        let testEntity2:Entity = undefined
        let entity = ec.AddEntityWithChild({
            component: CreateCom(-1, 0, 0, 0, 1, 1),
            child: [
                {
                    bindTo:(e)=>testEntity = e,
                    component: CreateCom(0, 0, 0, 0, 2, 2),
                    child: [
                        {
                            component: CreateCom(0, 0, 0, 0, 2, 2),
                            bindTo: (e) => testEntity2 = e
                        }
                    ]
                }
            ]
        })
        let arr = [entity]
        while (arr.length > 0) {
            let entity = arr.pop()
            UpdateTransformUtils.Update(entity)
            entity.child.forEach(child => {
                arr.push(child)
            })
        }
        let pos = testEntity2.components.get(Position)
        let tran = testEntity2.components.get(Transformation)
        console.log(pos, tran)
        // result should be 0.5
        console.log(CalculateLocalPos(testEntity2 , 1,0))
    }
}

function FactoryFn<T>(cb: () => T) {
    return cb()
}

function CreateCom(x: number, y: number, dx: number, dy: number, sx: number, sy: number): Object[] {
    let pos = new Position()
    pos.x = x
    pos.y = y

    let tran = new Transformation()
    tran.dx = dx
    tran.dy = dy
    tran.scaleX = sx
    tran.scaleY = sy
    return [
        pos, tran
    ]
}