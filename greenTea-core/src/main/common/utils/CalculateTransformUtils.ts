import { Entity } from "greentea-infrastructure/ecs/entity/Entity";
import { Position } from "../component/Position.js";
import { Transformation } from "../component/Transformation.js";

export function CalculateLocalPos(entity: Entity, screenX: number, screenY: number): { x: number, y: number } {
    let pos = entity.components.get(Position)
    let tran = entity.components.get(Transformation)
    return {
        x: ((screenX - pos.screenX) / tran.screenScaleX) - tran.screenDx,
        y: ((screenY - pos.screenY) / tran.screenScaleY) - tran.screenDy,
    }
}