import * as PIXI from "pixi.js"

export interface IPixiNodeRender <NodeT extends PIXI.DisplayObject, RenderPropertyT>
{
    (node: NodeT, property: RenderPropertyT):void
}