import { BoxCollider } from "../component/collider/BoxCollider.js";
import { ColliderComponent } from "../component/collider/ColliderComponent.js";
import { CollisionMap } from "../systemResource/CollisionMap.js";
import * as CollisionUtils from "greentea-infrastructure/geometry/collision/CollisionUtils"
import { CircleCollider } from "../component/collider/CircleCollider.js";
import { Position } from "../../common/component/Position.js";
import { Transformation } from "../../common/component/Transformation.js";
import { Entity } from "greentea-infrastructure/ecs/entity/Entity";
import { Bounding } from "greentea-infrastructure/geometry/types/Bounding";
import * as BoxComparer from "../system/Comparer/BoxComparer.js"
import { BoundingUtils } from "./BoundingUtils.js";


export function getEntityInPoint(
    px: number,
    py: number,
    collisionMap: CollisionMap
): Set<Entity> {
    let chunkMap = collisionMap.getChunkMap()
    let ret = new Set<Entity>()
    let chunkIds = collisionMap.getChunkId(py, py, px, px)
    for (let id of chunkIds) {
        let chunk = chunkMap.get(id)
        if (chunk === null || chunk === undefined) {
            continue
        }

        chunk.forEach(entity => {
            let pos = entity.components.get(Position) as Position
            let transformation = entity.components.get(Transformation) as Transformation
            let colliderComponent = entity.components.get(ColliderComponent) as ColliderComponent
            let collider = colliderComponent.collider

            if (collider instanceof BoxCollider) {
                if (CollisionUtils.RectAndPoint(
                    collider.dx * transformation.screenScaleX + pos.screenX + transformation.screenDx,
                    collider.dy * transformation.screenScaleY + pos.screenY + transformation.screenDy,
                    collider.w * transformation.screenScaleX,
                    collider.h * transformation.screenScaleY,
                    px,
                    py
                )) {
                    ret.add(entity)
                }
            }

            if (collider instanceof CircleCollider) {
                if (CollisionUtils.CircleAndPoint(
                    collider.dx * transformation.screenScaleX + pos.screenX + transformation.screenDx,
                    collider.dy * transformation.screenScaleY + pos.screenY + transformation.screenDy,
                    collider.r * transformation.screenScaleX,
                    px,
                    py
                )) {
                    ret.add(entity)
                }
            }
        })
    }
    return ret
}

export function getEntityInRect(
    x: number, y: number, w: number, h: number,
    collisionMap: CollisionMap
) {
    let result: Entity[] = []
    let pos = new Position()
    let tran = new Transformation()
    let colliderCom = new ColliderComponent()
    let boxCollider = new BoxCollider()

    colliderCom.collider = boxCollider

    pos.screenX = x
    pos.screenY = y
    tran.screenDx = tran.screenDy = 0
    tran.screenScaleX = tran.screenScaleY = 1
    boxCollider.w = w
    boxCollider.h = h

    let bound = BoundingUtils.getEntityBounding(pos,tran,colliderCom)
    let chunkIds = collisionMap.getChunkId(bound.top, bound.bottom, bound.left, bound.right)
    let chunkMap = collisionMap.getChunkMap()

    for (let chunkId of chunkIds) {
        let chunk = chunkMap.get(chunkId)
        if (chunk === null || chunk === undefined) {
            continue
        }

        chunk.forEach(entity => {
            let pos2 = entity.components.get(Position)
            let colliderComponent2 = entity.components.get(ColliderComponent)
            let collider2 = colliderComponent2.collider
            let transformation2 = entity.components.get(Transformation)
            if (
                BoxComparer.Compare(
                    pos,
                    pos2,
                    boxCollider,
                    collider2,
                    tran,
                    transformation2
                )
            ) {
                result.push(entity)
            }
        })

    }
    return result
}