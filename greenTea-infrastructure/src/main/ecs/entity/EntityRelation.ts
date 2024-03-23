import { Entity } from './Entity.js';


export type EntityRelation = {
    component: Object[];
    child?: EntityRelation[];
    bindTo?: (entity: Entity) => void;
};
