import { AnimationBaseType } from "../types/AnimationBaseType.js";
import { AnimationComponentUtils } from "../utils/AnimationComponentUtils.js";

export class AnimationComponent
{
    animationList:AnimationBaseType[] = []
    waitForRemoveList:AnimationBaseType[] = []
    utils:AnimationComponentUtils = new AnimationComponentUtils(this)
}