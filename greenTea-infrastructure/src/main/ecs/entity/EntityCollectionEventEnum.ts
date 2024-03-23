import { Entity } from "./Entity.js";

export enum EntityCollectionEventEnum {
    CREATE,
    DESTROY,
}

export interface EntityCollectionEventTypeMap {
    [EntityCollectionEventEnum.CREATE]: Entity;
    [EntityCollectionEventEnum.DESTROY]: Entity;
}