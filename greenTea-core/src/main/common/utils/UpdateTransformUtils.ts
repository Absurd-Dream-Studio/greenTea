import { Entity } from "greentea-infrastructure/ecs/entity/Entity";
import { Position } from "../component/Position.js";
import { Transformation } from "../component/Transformation.js";

export const UpdateTransformUtils = {
    Update(entity:Entity)
    {
        let pos = entity.components.get(Position)
        let tran = entity.components.get(Transformation)
        let p_pos: Position
        let p_tran: Transformation

        if (pos && tran) {
            if (entity.parent) {
                p_pos = entity.parent.components.get(Position)
                p_tran = entity.parent.components.get(Transformation)
            }
            if (p_pos && p_tran) {
                pos.screenX = p_pos.screenX + (pos.x * p_tran.screenScaleX)
                pos.screenY = p_pos.screenY + (pos.y * p_tran.screenScaleY)
                pos.screenZ = p_pos.screenZ + pos.z
                tran.screenDx = p_tran.screenDx + (p_tran.screenScaleX * tran.dx)
                tran.screenDy = p_tran.screenDy + (p_tran.screenScaleY * tran.dy)
                tran.screenScaleX = p_tran.screenScaleX * tran.scaleX
                tran.screenScaleY = p_tran.screenScaleY * tran.scaleY
            } else {
                pos.screenX = pos.x
                pos.screenY = pos.y
                pos.screenZ = pos.z
                tran.screenDx = tran.dx
                tran.screenDy = tran.dy
                tran.screenScaleX = tran.scaleX
                tran.screenScaleY = tran.scaleY
            }
        } else {
            return
        }
    }
}