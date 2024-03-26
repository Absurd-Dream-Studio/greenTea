import { Position } from "greentea-core/common/component/Position"
import { Transformation } from "greentea-core/common/component/Transformation"
import { Entity } from "greentea-infrastructure/ecs/entity/Entity"
import { MatterJsComponent } from "./MatterJsComponent.js"
import * as Matter from "matter-js"

export const MatterJsTranUtils = {
    updateBodyTran(item: Entity) {
        const pos = item.components.get(Position)
        const tran = item.components.get(Transformation)
        const com = item.components.get(MatterJsComponent)
        if (pos && tran && com) {
            const body = com.body.getBody()
            Matter.Body.setPosition(body, {
                x: pos.screenX,
                y: pos.screenY
            })
            Matter.Body.translate(body, {
                x: tran.screenDx,
                y: tran.screenDy
            })
            Matter.Body.scale(body, tran.screenScaleX, tran.screenScaleY)

            if (item.parent) {
                body.isSensor = true
            }
        }
        item.child.forEach(child => {
            this.updateBodyTran(child)
        })
    }
}