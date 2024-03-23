import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { Entity } from "greentea-infrastructure/ecs/entity/Entity";
import { Newable } from "greentea-infrastructure/lang/ICommonInterfaces";

export function getSingularComponent<T>(
    ec:IEntityCollection,
    componentClass:Newable<T>
):T
{
    return ec.Query().WithAll
    (
        [
            componentClass
        ]
    ).GetIterator().next().components.get(componentClass)
}

export function getSingularEntity(ec:IEntityCollection , tagClass:Function):Entity
{
    return ec.Query().WithAll
    (
        [
            tagClass
        ]
    ).GetIterator().next()
}