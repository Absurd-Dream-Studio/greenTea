import * as Collections from 'typescript-collections'
import { EntityIterator } from "./EntityIterator.js";
import { IEntityQuery } from "../IEntityQuery.js";
import { IEntityCollection } from '../IEntityCollection.js';
import { IEntityIterator } from '../IEntityIterator.js';
import { EntityCollection } from './EntityCollection.js';

export class EntityQuery implements IEntityQuery {
  private readonly entityCollection: EntityCollection
  private readonly chunkIdSet: Set<String>

  constructor(
    entityCollection: EntityCollection
  ) {
    this.entityCollection = entityCollection;
    this.chunkIdSet = this.entityCollection.GetAllChunkIdSet()
  }

  GetIterator(): IEntityIterator {
    return new EntityIterator(
      this.entityCollection,
      Array.from(this.chunkIdSet.values())
    )
  }

  WithAll(components: Array<Function>): IEntityQuery {
    for (var item of components) {
      let componentsChunkIdSet = this.entityCollection.GetChunkIdSetByComponent(item)
      this.chunkIdSet.forEach(id => {
        if (!componentsChunkIdSet.has(id)) {
          this.chunkIdSet.delete(id)
        }
      })
    }
    return this;
  }
}