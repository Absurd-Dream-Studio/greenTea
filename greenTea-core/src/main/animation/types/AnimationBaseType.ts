import { AnimationDurationType } from "./AnimationDurationType.js"
import { IFinishCallBack } from "./IFinishCallBack.js"
import { KeyframeType } from "./KeyframeType.js"

export type AnimationBaseType = 
{
    duration:AnimationDurationType
    finishCallBacks: IFinishCallBack[]
    keyframes:KeyframeType[]
    tag?:string
}