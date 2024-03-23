export type PointerEventType ={
    type:"pointerdown"|"pointermove"|"pointerup"|"pointercancel",
    pointerId:number
    clientX:number
    clientY:number
    worldX:number
    worldY:number
}