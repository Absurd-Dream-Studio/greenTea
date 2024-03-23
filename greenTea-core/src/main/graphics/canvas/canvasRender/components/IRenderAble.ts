import { Entity } from "greentea-infrastructure/ecs/entity/Entity";

export interface IRenderAble
{
    Render(canvas:HTMLCanvasElement , entity:Entity):void
}