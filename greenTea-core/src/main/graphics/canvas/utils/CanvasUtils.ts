import { Transformation } from "../../../common/component/Transformation.js"

export function applyTransform(
    canvas: HTMLCanvasElement,
    transformation: Transformation
) {
    let context = canvas.getContext('2d')
    context.scale(transformation.scaleX, transformation.scaleY)
}
