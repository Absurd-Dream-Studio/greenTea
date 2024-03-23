import * as PIXI from "pixi.js"
import { PixiNode } from "./component/PixiNode.js"

export interface IPixiNodeFactory<NodeT extends PIXI.DisplayObject, RenderPropertyT> {
    build(): PixiNode<NodeT, RenderPropertyT>
}