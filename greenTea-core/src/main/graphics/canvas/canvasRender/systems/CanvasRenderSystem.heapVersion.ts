import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { Position } from "@Src/common/component/Position.js";
import { Transformation } from "@Src/common/component/Transformation.js";
import { Runnable } from "greentea-infrastructure/lang/Runnable";
import { inject, injectable } from "inversify";

import * as Collections from "typescript-collections"
import { applyTransform } from "../../utils/CanvasUtils.js";
import { CanvasRender } from "../components/CanvasRenderComponent.js";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { Entity } from "greentea-infrastructure/ecs/entity/Entity";

@injectable()
export class CanvasRenderSystem implements Runnable
{
    private canvas:HTMLCanvasElement
    private ec:IEntityCollection

    constructor(
        @inject(TypeConfiguration.TYPES.IEntityCollection) ec: IEntityCollection,
        @inject(TypeConfiguration.TYPES.Canvas) canvas: HTMLCanvasElement
    ) {
        this.ec = ec;
        this.canvas = canvas
    }

    Run(): void {
        let renderList = new Collections.Heap(this.heapCompare)
        let context = this.canvas.getContext('2d')
        var iterator = this.ec.Query()
        .WithAll([
            Transformation,
            Position,
            CanvasRender
        ])
        .GetIterator()

        while(iterator.hasNext())
        {
            let item = iterator.next()
            renderList.add(item)
        }

        while(!renderList.isEmpty())
        {
            const item = renderList.peek()
            renderList.removeRoot()

            let transformation:Transformation = item.components.get(Transformation) as Transformation
            let pos:Position = item.components.get(Position) as Position
            let canvasRender = item.components.get(CanvasRender) as CanvasRender

            context.save()
            context.translate(pos.screenX,pos.screenY)
            applyTransform(this.canvas,transformation)
            canvasRender.renderAble.Render(this.canvas,item)
            context.restore()
        }
    }

    private heapCompare(
        e1: Entity,
        e2: Entity
    ) {
        let pos1:Position = e1.components.get(Position) as Position
        let pos2:Position = e2.components.get(Position) as Position
        return pos1.screenZ - pos2.screenZ
    }
}