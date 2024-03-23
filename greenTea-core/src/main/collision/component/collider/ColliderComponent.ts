import { Entity } from "greentea-infrastructure/ecs/entity/Entity";
import { ColliderBase } from "./ColliderBase.js";

export class ColliderComponent
{
    collider:ColliderBase
    collisionSet:Set<Entity> = new Set()
}