import { GestureContext } from "./gestureEventGeneration/GestureContext.js";

export const GestureUtils = {
    ToScreenXy(context: GestureContext, x: number, y: number) {
        return {
            x: (x - context.dx) / context.sx,
            y: (y - context.dy) / context.sy,
        }
    },
    ToWorldXy(context: GestureContext, x: number, y: number) {
        return {
            x: context.sx * x + context.dx,
            y: context.sy * y + context.dy
        }
    }
}