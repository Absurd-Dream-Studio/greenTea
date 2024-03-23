import * as CommonSpeedFunction from "@Src/animation/speedFunctions/CommonSpeedFunctions.js";
import { AnimationBaseType } from "../types/AnimationBaseType.js";
import { KeyframeType } from "../types/KeyframeType.js";
import * as InterpolationUtils from "greentea-infrastructure/math/InterpolationUtils"

export class AnimationFactory {

    private result: AnimationBaseType;

    constructor() {
        this.result = {
            duration: {
                rate: 0,
                lastRate: 0,
                time: 0,
                repeat: false,
            },
            finishCallBacks: [],
            keyframes: []
        }
    }

    addTransition(config:Partial<TransitionConfing>): AnimationFactory {
        let _config:TransitionConfing = {
            from: 0,
            to: 1,
            speedFunction: CommonSpeedFunction.LinearSpeedFunction,
            transition: () => { },
            valueType: VType.ABSOLUTE,
            startRate: 0,
            endRate: 1
        }

        Object.assign(_config, config)

        this.result.keyframes.push(new KeyframeType ({
            startRate: _config.startRate,
            endRate: _config.endRate,
            speedFunction: _config.speedFunction,
            handler: (keyframe) => {
                let currRate = keyframe.speedFunction(keyframe.currRate)
                let lastRate = keyframe.speedFunction(keyframe.lastRate)
                let value = 0
                switch(_config.valueType)
                {
                    case VType.ABSOLUTE:
                        value = InterpolationUtils.Lerp(_config.from , _config.to , currRate)
                        break
                    default:
                        value = (currRate - lastRate) * (_config.to - _config.from)
                        break
                }
                _config.transition(value)
            }
        }))
        return this
    }

    setDuration(duration: number): AnimationFactory {
        this.result.duration.time = duration
        return this
    }

    setRepeat(repeat: boolean): AnimationFactory {
        this.result.duration.repeat = repeat
        return this
    }

    addFinishCallBack(callback: () => void): AnimationFactory {
        this.result.finishCallBacks.push(callback)
        return this
    }

    getInstance(): AnimationBaseType {
        return this.result;
    }
}

export type TransitionConfing = {
    from:number,
    to:number,
    startRate:number,
    endRate:number,
    speedFunction:(rate:number)=>number,
    transition: (rate:number)=>void,
    valueType:VType,
}

export enum VType {
    DELTA,
    ABSOLUTE,
}