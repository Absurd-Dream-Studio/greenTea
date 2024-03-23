import { Entity } from "../Entity.js";
import { IEntityCollection } from "../IEntityCollection.js";
import { IEntityIterator } from "../IEntityIterator.js";
import { EntityCollection } from "./EntityCollection.js";

export class EntityIterator implements IEntityIterator {
    private entities: Array<Entity>

    constructor(
        entityCollection: EntityCollection,
        iterateChunkIds: Array<String>
    ) {
        this.entities = iterateChunkIds.map(x => {
            return entityCollection.GetEntityChunk(x)
        }).map(x => { return x.GetValues() }).flat();
    }

    hasNext(): boolean {
        return this.entities.length > 0;
    }

    next(): Entity {
        return this.entities.pop()
    }
}