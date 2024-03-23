import { CollisionMap } from "@Src/collision/systemResource/CollisionMap.js";
import { BTNodeType } from "greentea-infrastructure/ai/behaviorTree/types/BTNodeType";
import { Entity } from "greentea-infrastructure/ecs/entity/Entity";
import { PointerEventType } from "../PointerEventType.js";
import { GestureContext } from "../../GestureContext.js";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";

export class GestureBtContext {
    gestureContext: GestureContext
    ec: IEntityCollection

    pointEvent: PointerEventType
    collisionMap: CollisionMap
    foucsEntity: Entity
    inPointEntities: Entity[] = []


    /**
     * record OnFocusInEvent entity
     */
    focusInEntity: Entity

    root: BTNodeType<GestureBtContext>

    processState: GestureProcessStateEnum = GestureProcessStateEnum.BEFORE_PROCESS_EVENT_QUEUE

    pointerMap: Map<number, {
        id: number,
        startTime: number,
        startScreenX: number,
        startScreenY: number,
        firstClickEntity: Entity,
        screenX: number,
        screenY: number,
        updated: boolean,
        canTriggerLongPress: boolean,
    }> = new Map()
}

export enum GestureProcessStateEnum {
    BEFORE_PROCESS_EVENT_QUEUE,
    PROCESS_EVENT_QUEUE,
    AFTER_PROCESS_EVENT_QUEUE,
}