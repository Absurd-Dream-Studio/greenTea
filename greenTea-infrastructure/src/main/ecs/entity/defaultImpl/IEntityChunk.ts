import { Entity } from "../Entity.js"

export interface IEntityChunk
{
    GetValues():Array<Entity>;
    GetEntityByKey(id:number):Entity;
    PutEntity(value:Entity):void;
    RemoveEntity(id:number):void;
    isEmpty():boolean;
}