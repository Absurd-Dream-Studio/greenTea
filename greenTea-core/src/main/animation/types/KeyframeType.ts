import { LinearSpeedFunction } from "../speedFunctions/CommonSpeedFunctions.js"

export class KeyframeType {
    startRate:number = 0
    endRate:number = 0
    currRate:number = 0
    lastRate:number = 0
    speedFunction: (rate:number) => number = LinearSpeedFunction
    done:boolean = false
    handler:(keyframe:KeyframeType)=>void

    constructor(init?:Partial<KeyframeType>)
    {
        Object.assign(this, init);
    }
}