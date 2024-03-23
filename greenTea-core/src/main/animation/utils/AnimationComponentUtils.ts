import { AnimationComponent } from "../components/AnimationComponent.js";
import { AnimationBaseType } from "../types/AnimationBaseType.js";
import { KeyframeType } from "../types/KeyframeType.js";

export class AnimationComponentUtils
{
    private animeCom:AnimationComponent

    constructor(animeCom:AnimationComponent)
    {
        this.animeCom = animeCom
    }

    forEachKeyFrame(
        handleFunction: (keyFrame:KeyframeType) => boolean
    )
    {
        for(let animation of this.animeCom.animationList)
        {
            for(let keyFrame of animation.keyframes)
            {
                handleFunction(keyFrame)
            }
        }
    }

    removeAnimation(animation:AnimationBaseType)
    {
        this.animeCom.waitForRemoveList.push(animation)
        // let index = this.animeCom.animationList.indexOf(animation)

        // if(index === -1)
        // {
        //     return
        // }

        // this.animeCom.animationList.splice(index,1)
    }
}