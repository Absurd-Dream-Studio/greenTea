import { Position } from "@Src/common/component/Position.js"
import { Transformation } from "@Src/common/component/Transformation.js"
import { BoxCollider } from "../../component/collider/BoxCollider.js"
import { CircleCollider } from "../../component/collider/CircleCollider.js"
import { ColliderBase } from "../../component/collider/ColliderBase.js"
import * as CollisionUtils from "greentea-infrastructure/geometry/collision/CollisionUtils"

export function Compare(
    pos1: Position,
    pos2: Position,
    collider1: CircleCollider,
    collider2: ColliderBase,
    transformation1: Transformation,
    transformation2: Transformation
): boolean {
    if (collider2 instanceof BoxCollider) {
        return CollisionUtils.RectAndCircle(
            (collider2.dx * transformation2.screenScaleX) + pos2.screenX + transformation2.screenDx,
            (collider2.dy * transformation2.screenScaleY) + pos2.screenY + transformation2.screenDy,
            (collider2.w * transformation2.screenScaleX),
            (collider2.h * transformation2.screenScaleY),
            collider1.dx * transformation1.screenScaleX + pos1.screenX + transformation1.screenDx,
            collider1.dy * transformation1.screenScaleY + pos1.screenY + transformation1.screenDy,
            collider1.r * transformation1.screenScaleX
        )
    }

    if (collider2 instanceof CircleCollider) {
        return CollisionUtils.CircleAndCircle(
            collider1.dx * transformation1.screenScaleX + pos1.screenX + transformation1.screenDx,
            collider1.dy * transformation1.screenScaleY + pos1.screenY + transformation1.screenDy,
            collider1.r * transformation1.screenScaleX,
            collider2.dx * transformation2.screenScaleX + pos2.screenX + transformation2.screenDx,
            collider2.dy * transformation2.screenScaleY + pos2.screenY + transformation2.screenDy,
            collider2.r * transformation2.screenScaleX
        )
    }
    return false
}