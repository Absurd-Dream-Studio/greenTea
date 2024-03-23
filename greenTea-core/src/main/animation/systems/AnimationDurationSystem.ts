import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { inject, injectable } from "inversify";
import { AnimationComponent } from "../components/AnimationComponent.js";
import { AnimationBaseType } from "../types/AnimationBaseType.js";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { ISystem } from "greentea-infrastructure/ecs/system/ISystem";
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig";

@injectable()
export class AnimationDurationSystem implements ISystem
{
    private ec:IEntityCollection
    private lastUpdateTime:number

    constructor(
        @inject(TypeConfiguration.TYPES.IEntityCollection) ec:IEntityCollection
    )
    {
        this.lastUpdateTime = 0
        this.ec = ec;
    }
    Register(): SystemConfig {
        return {
            onUpdate:()=>this.OnUpdate()
        }
    }

    private OnUpdate(): void {

        if (this.lastUpdateTime === 0) {
            this.lastUpdateTime = Date.now()
        }

        let iterator = this.ec.Query()
            .WithAll(
                [
                    AnimationComponent
                ]
            ).GetIterator()

        while (iterator.hasNext()) {
            let item = iterator.next()
            let animation: AnimationComponent = item.components.get(AnimationComponent) as AnimationComponent
            let lastMs: number = Date.now() - this.lastUpdateTime

            for(let animationBase of animation.animationList)
            {
                this.handleAnimationBaseRate(lastMs , animationBase)
                this.handleKeyFrameRate(animationBase)
            }
        }
        this.lastUpdateTime = Date.now()
    }

    private handleAnimationBaseRate(lastMs: number, animation: AnimationBaseType) {
        animation.duration.lastRate = animation.duration.rate
        animation.duration.rate = animation.duration.rate + (lastMs / animation.duration.time)
        animation.duration.rate = Math.min(1, animation.duration.rate)
        // console.log('base rate' , animation.duration.rate)
    }

    private handleKeyFrameRate(animationBase:AnimationBaseType)
    {

        let i = animationBase.keyframes.length

        while(i--)
        {
            let keyframe = animationBase.keyframes[i]
            keyframe.lastRate = keyframe.currRate
            keyframe.currRate = (animationBase.duration.rate - keyframe.startRate) / (keyframe.endRate - keyframe.startRate)
            keyframe.currRate = Math.max(0,keyframe.currRate)
            keyframe.currRate = Math.min(1 , keyframe.currRate)


            if(keyframe.currRate === 1)
            {
                keyframe.done = true
            }
        }
    }
}