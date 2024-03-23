import { Entity } from '../Entity.js';
import { EntityChunk } from './EntityChunk.js';
import { EntityQuery } from './EntityQuery.js';
import { IEntityCollection } from '../IEntityCollection.js';
import { EntityRelation } from '../EntityRelation.js';
import { IEntityChunk } from './IEntityChunk.js';
import { IEntityQuery } from '../IEntityQuery.js';
import { ListenerManager } from '@Src/designPattern/behavioral/listener/ListenerManager.js';
import { EntityCollectionEventEnum, EntityCollectionEventTypeMap } from '../EntityCollectionEventEnum.js';
import { injectable } from 'inversify';

@injectable()
export class EntityCollection implements IEntityCollection {
    private readonly listenerManager: ListenerManager<EntityCollectionEventEnum, EntityCollectionEventTypeMap>;
    private entityChunk: Map<String, IEntityChunk>;
    private componentKeyMap: Map<Function, number>;
    private componentChunkIdMap: Map<Function, Set<String>>;
    private entityMap: Map<number, Entity>;

    private currComponentId: number;
    private currEntityId: number;

    constructor() {
        this.componentKeyMap = new Map();
        this.entityChunk = new Map();
        this.componentChunkIdMap = new Map();
        this.entityMap = new Map();

        this.currComponentId = 0;
        this.currEntityId = 0;
        this.listenerManager = new ListenerManager();
    }

    GetListenerManager(): ListenerManager<EntityCollectionEventEnum, EntityCollectionEventTypeMap> {
        return this.listenerManager;
    }

    GetEntityById(id: number): Entity {
        return this.entityMap.get(id);
    }

    Query(): IEntityQuery {
        return new EntityQuery(this)
    }

    GetAllChunkIdSet(): Set<String> {

        let ret: Set<String> = new Set();

        this.entityChunk.forEach(
            (value, key, map) => {
                ret.add(key)
            }
        )

        return ret;
    }

    GetChunkIdSetByComponent(component: Function): Set<String> {
        let ret: Set<String> = new Set<String>();
        let chunkIdSet = this.componentChunkIdMap.get(component)

        if (chunkIdSet) {
            chunkIdSet.forEach((value) => {
                ret.add(value)
            })
        }
        return ret;
    }

    GetEntityChunkByEntity(entity: Entity): IEntityChunk {
        let chunkId = this.GetEntityChunkIdByEntity(entity);
        let chunk = this.GetEntityChunk(chunkId);
        return chunk
    }

    GetEntityChunk(chunkId: String): IEntityChunk {
        return this.entityChunk.get(chunkId)
    }

    AddEntity(components: Object[]): Entity {
        return this.AddEntityProcess(components, undefined)
    }


    AddEntityWithChild(parms: EntityRelation): Entity {
        return this.ApplyEntityRelation(undefined, parms)
    }


    AddChild(entity: Entity, child: EntityRelation[]): Entity[] {
        let ret: Entity[] = []
        child.forEach(x => {
            let childEntity = this.ApplyEntityRelation(entity, x)
            ret.push(childEntity)
            entity.child.push(childEntity)
        })
        return ret
    }

    RemoveEntity(entity: Entity): void {
        if (entity.parent) {
            let index = entity.parent.child.indexOf(entity)
            if (index !== -1) {
                entity.parent.child.splice(index, 1)
            }
        }
        let queue: Array<Entity> = []
        queue.push(entity)
        while (queue.length > 0) {
            let item = queue.shift()
            this.RemoveEntityProcess(item)
            item.child.forEach(x => queue.push(x))
        }
    }

    GetEntityChunkId(components: Function[]): String {
        let retNumber: Array<number> = []

        for (var item of components) {
            retNumber.push(
                this.GetComponentKey(item)
            )
        }
        return retNumber.sort().join('')
    }

    GetEntityChunkIdByEntity(entity: Entity): String {
        let components = Array.from(entity.components.keys())
        let chunkId = this.GetEntityChunkId(components);
        return chunkId;
    }

    private GetComponentKey(component: Function): number {
        let ret: number = this.componentKeyMap.get(component)
        if (ret === undefined) {
            ret = this.currComponentId++
            this.componentKeyMap.set(component, ret);
        }
        return ret;
    }

    private AddEntityProcess(components: Object[], parent: Entity): Entity {
        let entity: Entity = new Entity()

        entity.components.init(components)

        let entityChunkId = this.GetEntityChunkIdByEntity(entity)
        for (var component of components) {
            let componentChunkIdSet: Set<String> = this.componentChunkIdMap.get(component.constructor)
            if (!componentChunkIdSet) {
                componentChunkIdSet = new Set()
                this.componentChunkIdMap.set(component.constructor, componentChunkIdSet)
            }

            componentChunkIdSet.add(entityChunkId)
        }

        entity.entityId = this.currEntityId++

        let entityChunk = this.GetEntityChunk(entityChunkId)
        if (!entityChunk) {
            entityChunk = new EntityChunk()
            this.entityChunk.set(entityChunkId, entityChunk)
        }

        entityChunk.PutEntity(entity)
        this.entityMap.set(entity.entityId, entity)


        entity.parent = parent
        this.listenerManager.evalListener(EntityCollectionEventEnum.CREATE, entity)
        return entity;
    }

    private RemoveEntityProcess(entity: Entity): void {
        let chunkId = this.GetEntityChunkIdByEntity(entity)
        let chunk = this.GetEntityChunkByEntity(entity)
        if (!chunk) {
            return
        }
        chunk.RemoveEntity(entity.entityId)
        if (chunk.isEmpty()) {
            this.entityChunk.delete(chunkId)
        }
        this.entityMap.delete(entity.entityId)
        this.listenerManager.evalListener(EntityCollectionEventEnum.DESTROY, entity)
    }

    private ApplyEntityRelation(parent: Entity, parms: EntityRelation): Entity {
        let queue: Array<{
            parent: Entity,
            entityRelation: EntityRelation
        }> = []
        let firstEntity: Entity
        let firstBindTo = parms.bindTo
        parms.bindTo = (e) => {
            if (firstBindTo) {
                firstBindTo(e)
            }
            firstEntity = e
        }

        queue.push({
            parent: parent,
            entityRelation: parms
        })
        while (queue.length > 0) {
            let item = queue.shift()
            let entityRelation = item.entityRelation
            let entity = this.AddEntityProcess(entityRelation.component, item.parent)
            if (entityRelation.bindTo) {
                entityRelation.bindTo(entity)
            }

            if (item.parent) {
                item.parent.child.push(entity)
            }

            if (entityRelation.child) {
                entityRelation.child.forEach(x => {
                    queue.push({
                        parent: entity,
                        entityRelation: x
                    })
                })
            }
        }
        return firstEntity
    }
}