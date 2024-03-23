import { ColliderComponent } from "../component/collider/ColliderComponent.js";
import { BoxCollider } from "../component/collider/BoxCollider.js";
import * as BoxComparer from "./Comparer/BoxComparer.js"
import * as CircleComparer from "./Comparer/CircleComparer.js"
import { CircleCollider } from "../component/collider/CircleCollider.js";
import { Position } from "../../common/component/Position.js";
import { Transformation } from "../../common/component/Transformation.js";
import { Runnable } from "greentea-infrastructure/lang/Runnable";
import { Bounding } from "greentea-infrastructure/geometry/types/Bounding";
import { CollisionMap } from "../systemResource/CollisionMap.js";
import { inject, injectable } from "inversify";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { Entity } from "greentea-infrastructure/ecs/entity/Entity";
import { ISystem } from "greentea-infrastructure/ecs/system/ISystem";
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig";
import { BoundingUtils } from "../utils/BoundingUtils.js";

@injectable()
export class CollisionSystem implements ISystem
{
    private collisionMap:CollisionMap
    private ec:IEntityCollection

    private s1TempObject:{
        bound:Bounding,
        chunkId:string
    }

    constructor(
        collisionMap:CollisionMap,
        @inject(TypeConfiguration.TYPES.IEntityCollection) ec:IEntityCollection
    )
    {
        this.collisionMap = collisionMap
        this.ec = ec

        this.s1TempObject = {
            bound:{
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            },
            chunkId:''
        }
    }
    Register(): SystemConfig {
        return {
            onUpdate:()=>this.OnUpdate()
        }
        throw new Error("Method not implemented.");
    }

    private OnUpdate(): void {
        let chunkMap = this.collisionMap.getChunkMap()
        chunkMap.clear()
        this.S1_AddToChunk()
    }

    private S1_AddToChunk()
    {
        let chunkMap = this.collisionMap.getChunkMap()
        let iterator = this.ec.Query()
        .WithAll(
            [
                Position,
                Transformation,
                ColliderComponent
            ]
        ).GetIterator()

        while(iterator.hasNext())
        {
            let item = iterator.next()
            let colliderComponent = item.components.get(ColliderComponent) as ColliderComponent
            let collider = colliderComponent.collider
            let pos = item.components.get(Position) as Position
            let tran = item.components.get(Transformation)

            colliderComponent.collisionSet.clear()

            if(collider === null || collider === undefined)
            {
                continue
            }

            Object.assign(this.s1TempObject.bound, BoundingUtils.getEntityBounding(pos, tran, colliderComponent))
            let chunkIds = this.collisionMap.addToMap(this.s1TempObject.bound , item)

            for(this.s1TempObject.chunkId of chunkIds)
            {
                let chunk = chunkMap.get(this.s1TempObject.chunkId)
                if(chunk === null || chunk === undefined)
                {
                    continue
                }
                this.S2_CollisionChecking(chunkMap.get(this.s1TempObject.chunkId),item)
            }
        }
    }

    private S2_CollisionChecking(chunk:Array<Entity> , entity:Entity)
    {
        let pos1 = entity.components.get(Position) as Position
        let colliderComponent1 = entity.components.get(ColliderComponent) as ColliderComponent
        let collider1 = colliderComponent1.collider
        let transformation1 = entity.components.get(Transformation) as Transformation

        for(var item of chunk)
        {
            if(item === entity)
            {
                continue
            }

            if(colliderComponent1.collisionSet.has(item))
            {
                continue
            }


            let pos2 = item.components.get(Position) as Position
            let colliderComponent2 = item.components.get(ColliderComponent) as ColliderComponent
            let collider2 = colliderComponent2.collider
            let transformation2 = item.components.get(Transformation) as Transformation
            let compareResult = false


            if(collider1 instanceof BoxCollider)
            {
                compareResult = BoxComparer.Compare(pos1,pos2,collider1,collider2,transformation1,transformation2)
            }

            if(collider1 instanceof CircleCollider)
            {
                compareResult = CircleComparer.Compare(pos1,pos2,collider1,collider2,transformation1,transformation2)
            }

            if(compareResult)
            {
                colliderComponent1.collisionSet.add(item)
                colliderComponent2.collisionSet.add(entity)
            }
        }
    }
}