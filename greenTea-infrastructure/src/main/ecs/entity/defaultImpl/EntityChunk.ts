import { Entity } from "../Entity.js";
import { IEntityChunk } from "./IEntityChunk.js";

export class EntityChunk implements IEntityChunk
{
    entityArray:Array<Entity>


    constructor()
    {
        this.entityArray = []
    }

    isEmpty(): boolean
    {
        return this.entityArray.length === 0
    }

    GetEntityByKey(id:number):Entity
    {
        return this.entityArray.find((v)=>v.entityId === id)
    }

    PutEntity(value:Entity)
    {
        this.entityArray.push(value)
    }

    RemoveEntity(id:number)
    {
        let entityIndex = this.entityArray.findIndex(v=>v.entityId === id)
        if(entityIndex === -1 )
        {
            return
        }
        this.entityArray.splice(entityIndex,1)
    }

    GetValues():Array<Entity>
    {
        return this.entityArray
    }
}