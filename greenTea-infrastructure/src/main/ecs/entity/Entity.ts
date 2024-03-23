import { EntityComponentMap } from "./defaultImpl/EntityComponentMap.js";
import { IEntityComponentMap } from "./IEntityComponentMap.js";

export class Entity
{
    public entityId:number = -1;
    public components:IEntityComponentMap = new EntityComponentMap(); 
    public parent:Entity
    public child:Entity[] = []
}