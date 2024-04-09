import { ListenerManager } from "greentea-infrastructure/designPattern/behavioral/listener/ListenerManager";
import { Entity } from "greentea-infrastructure/ecs/entity/Entity";
import { injectable } from "inversify";
import { GestureEventTriggerEventEnum, GestureEventTriggerEventTypeMap } from "../gestureEventTrigger/GestureEventTriggerComponent.js";

@injectable()
export class GestureContext {
    dx: number = 0
    dy: number = 0
    sx: number = 1
    sy: number = 1

    fetchInPointEntities: (worldX:number,worldY:number) => Entity[] = () => []

    /**
     * @description will be triggered when event not consumed by any entity
     */
    backgroundEventListener: ListenerManager<GestureEventTriggerEventEnum, GestureEventTriggerEventTypeMap> = new ListenerManager()
}