import { Entity } from "greentea-infrastructure/ecs/entity/Entity";
import * as Matter from "matter-js";
import { MatterJsBodyContainer } from "./MatterJsBodyContainer.js";

export class MatterJsComponent
{
    body = new MatterJsBodyContainer();
    collisionSet:Set<Entity> = new Set()
}