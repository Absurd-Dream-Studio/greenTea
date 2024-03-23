import { PixiNode } from "./PixiNode.js"
import * as PIXI from "pixi.js"

export class PixiComponent<RenderPropertyT>
{
    property: RenderPropertyT
    node: PixiNode<PIXI.DisplayObject, RenderPropertyT>
    container:PIXI.Container = new PIXI.Container()
}