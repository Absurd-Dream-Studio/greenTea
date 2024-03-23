import { ListenerManager } from "greentea-infrastructure/designPattern/behavioral/listener/ListenerManager";
import { Entity } from "greentea-infrastructure/ecs/entity/Entity";

export class EntityLifecycleComponent
{
    eventListener:ListenerManager<EntityLifecycleEventEnum,EntityLifecycleEventTypeMap> = new ListenerManager()
    started:boolean = false
}

export enum EntityLifecycleEventEnum
{
    ON_CREATE,
    ON_START,
    ON_UPDATE,
    ON_FRAME_UPDATE,
    ON_REMOVE
}

export interface EntityLifecycleEventTypeMap
{
    [EntityLifecycleEventEnum.ON_CREATE]:{entity:Entity}
    [EntityLifecycleEventEnum.ON_START]:{entity:Entity}
    [EntityLifecycleEventEnum.ON_UPDATE]:{entity:Entity}
    [EntityLifecycleEventEnum.ON_FRAME_UPDATE]:{deltaMs:number , entity:Entity}
    [EntityLifecycleEventEnum.ON_REMOVE]:{entity:Entity}
}