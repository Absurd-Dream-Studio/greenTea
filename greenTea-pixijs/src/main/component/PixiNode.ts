import * as PIXI from "pixi.js"
import { IPixiNodeRender } from "./IPixiNodeRender.js"

export type PixiNode<NodeT extends PIXI.DisplayObject, RenderPropertyT> = {
    displayObj: NodeT
    render: IPixiNodeRender<NodeT, RenderPropertyT>
}