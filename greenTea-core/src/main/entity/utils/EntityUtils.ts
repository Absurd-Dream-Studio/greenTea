import { Entity } from "greentea-infrastructure/ecs/entity/Entity";
import { Newable } from "greentea-infrastructure/lang/ICommonInterfaces";

export function getComponent<T extends Object>(
    entity:Entity,
    target:Newable<T>
):T
{
    return entity.components.get(target) as T
}