import { BoxCollider } from "../component/collider/BoxCollider.js";
import { CircleCollider } from "../component/collider/CircleCollider.js";
import { ColliderComponent } from "../component/collider/ColliderComponent.js";
import { Position } from "../../common/component/Position.js";
import { Transformation } from "../../common/component/Transformation.js";
import { Runnable } from "greentea-infrastructure/lang/Runnable";
import { inject, injectable } from "inversify";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { ISystem } from "greentea-infrastructure/ecs/system/ISystem";
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig";

@injectable()
export class ColliderRenderSystem implements ISystem{
    private ec:IEntityCollection
    private canvas:HTMLCanvasElement

    constructor(
        @inject(TypeConfiguration.TYPES.IEntityCollection) ec:IEntityCollection,
        @inject(TypeConfiguration.TYPES.Canvas) canvas:HTMLCanvasElement
        )
    {
        this.ec = ec
        this.canvas = canvas
    }
    Register(): SystemConfig {
        return {
            onUpdate:()=>this.OnUpdate()
        }
        throw new Error("Method not implemented.");
    }

    OnUpdate(): void {
        let iterator = this.ec.Query()
        .WithAll(
            [
                Position,
                ColliderComponent,
                Transformation
            ]
        ).GetIterator()

        while(iterator.hasNext())
        {
            let item = iterator.next()
            let pos = item.components.get(Position) as Position
            let trans = item.components.get(Transformation) as Transformation
            let colliderCom = item.components.get(ColliderComponent) as ColliderComponent

            if(colliderCom.collider instanceof BoxCollider)
            {
                this.renderBoxCollider(pos,trans,colliderCom.collider)
            }

            if(colliderCom.collider instanceof CircleCollider)
            {
                this.renderCircleCollider(pos,trans,colliderCom.collider)
            }
        }
    }

    private renderBoxCollider(
        pos:Position,
        transformation:Transformation,
        boxCollider:BoxCollider
    )
    {
        let context = this.canvas.getContext('2d')
        context.save()
        context.strokeStyle = 'green'
        context.strokeRect(
            pos.screenX + (boxCollider.dx * transformation.scaleX),
            pos.screenY + (boxCollider.dy * transformation.scaleY),
            (boxCollider.w * transformation.scaleX),
            (boxCollider.h * transformation.scaleY)
        )
        context.restore()
    }

    private renderCircleCollider(
        pos:Position,
        transformation:Transformation,
        circleCollider:CircleCollider
    )
    {
        let context = this.canvas.getContext('2d')
        context.save()
        context.beginPath()
        context.arc(
            circleCollider.dx * transformation.scaleX + pos.screenX,
            circleCollider.dy * transformation.scaleY + pos.screenY,
            circleCollider.r * transformation.scaleX,
            0,2*Math.PI,true)
        context.strokeStyle = 'green'
        context.stroke()
        context.restore()
    }
}