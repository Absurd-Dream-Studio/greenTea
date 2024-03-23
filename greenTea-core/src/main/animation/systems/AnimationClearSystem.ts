import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { inject, injectable } from "inversify";
import { AnimationComponent } from "../components/AnimationComponent.js";
import { AnimationBaseType } from "../types/AnimationBaseType.js";
import { ISystem } from 'greentea-infrastructure/ecs/system/ISystem'
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";

@injectable()
export class AnimationClearSystem implements ISystem
{
    private ec:IEntityCollection

    constructor(
        @inject(TypeConfiguration.TYPES.IEntityCollection)ec:IEntityCollection
    )
    {
        this.ec = ec
    }

    Register(): SystemConfig {
        return {
            onUpdate:()=>{this.OnUpdate()}
        }
    }

    private OnUpdate(): void {
        let iterator = this.ec.Query().WithAll(
            [
                AnimationComponent
            ]
        ).GetIterator()

        while(iterator.hasNext())
        {
            const item = iterator.next()
            let animationComponent: AnimationComponent = item.components.get(AnimationComponent) as AnimationComponent

            for(let animation of animationComponent.animationList)
            {
                this.clearKeyFrame(animation)
            }

            this.clearAnimation(animationComponent)
        }
    }

    private clearAnimation(animationCom:AnimationComponent)
    {
        let i = animationCom.animationList.length

        while(i--)
        {
            let animation = animationCom.animationList[i]
            if(animation.duration.rate === 1 && !animation.duration.repeat)
            {
                if(animation.finishCallBacks)
                {
                    for(let callBack of animation.finishCallBacks)
                    {
                        callBack()
                    }
                }
                // animationCom.animationList.splice(i,1)
                animationCom.utils.removeAnimation(animation)
            } else if (animation.duration.rate === 1 && animation.duration.repeat) {
                animation.duration.lastRate = 0
                animation.duration.rate = 0

                for(let item of animation.keyframes)
                {
                    item.done = false
                    item.currRate = 0
                    item.lastRate = 0
                }
            }
        }

        /**
         * using wait for remove list to avoid state change from finish call back
         * if finish call back remove animation , there list structure will broken ,
         * therefore remove completed animation after the finish call back 
         */
        while (animationCom.waitForRemoveList.length > 0) {
            let item = animationCom.waitForRemoveList.pop()
            let index = animationCom.animationList.indexOf(item)
            if (index === -1) {
                return
            }
            animationCom.animationList.splice(index, 1)
        }
    }

    private clearKeyFrame(animation:AnimationBaseType)
    {
        let i = animation.keyframes.length

        while (i--) {
            let keyframe = animation.keyframes[i]
            if (keyframe.done && !animation.duration.repeat) {
                animation.keyframes.splice(i, 1)
            }
        }
    }
}