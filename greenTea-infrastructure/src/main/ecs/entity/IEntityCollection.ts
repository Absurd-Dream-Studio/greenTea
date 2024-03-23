import { Entity } from './Entity.js'
import { IEntityQuery } from './IEntityQuery.js';
import { EntityRelation } from './EntityRelation.js';
import { IEntityChunk } from './defaultImpl/IEntityChunk.js';
import { ListenerManager } from '@Src/designPattern/behavioral/listener/ListenerManager.js';
import { EntityCollectionEventEnum, EntityCollectionEventTypeMap } from './EntityCollectionEventEnum.js';

export interface IEntityCollection
{
    Query():IEntityQuery;
    AddEntity(components:Array<Object>):Entity;
    AddEntityWithChild(relation: EntityRelation): Entity;
    AddChild(entity: Entity, child: EntityRelation[]): Entity[]
    /**
     * find entity by id , return undefined if not found
     * @param id entity id
     */
    GetEntityById(id:number):Entity;
    RemoveEntity(entity:Entity):void;
    GetListenerManager(): ListenerManager<EntityCollectionEventEnum, EntityCollectionEventTypeMap>;
}