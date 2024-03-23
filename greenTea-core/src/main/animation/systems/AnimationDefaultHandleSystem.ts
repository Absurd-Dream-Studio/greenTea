import { Position } from "../../common/component/Position.js";
import { Transformation } from "../../common/component/Transformation.js";
import { Runnable } from "greentea-infrastructure/lang/Runnable";
import { inject, injectable } from "inversify";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { AnimationComponent } from "../components/AnimationComponent.js";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { ISystem } from "greentea-infrastructure/ecs/system/ISystem";
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig";

@injectable()
export class AnimationDefaultHandleSystem implements ISystem
{
    private ec:IEntityCollection

    constructor(
        @inject(TypeConfiguration.TYPES.IEntityCollection) ec:IEntityCollection
    )
    {
        this.ec = ec
    }

    Register(): SystemConfig {
        return {
            onUpdate:()=>this.OnUpdate()
        }
    }

    private OnUpdate(): void {
        const iterator = this.ec.Query()
        .WithAll(
            [
                AnimationComponent
            ]
        ).GetIterator()

        while(iterator.hasNext())
        {
            let item = iterator.next()
            let animationComponent = item.components.get(AnimationComponent) as AnimationComponent
            let transformation:Transformation = item.components.get(Transformation) as Transformation
            let position:Position = item.components.get(Position) as Position

            for(let animation of animationComponent.animationList)
            {
                for(let keyframe of animation.keyframes)
                {
                    if (animation.duration.rate < keyframe.startRate || !keyframe.handler) {
                        continue
                    }

                    keyframe.handler(keyframe)
                }
            }
        }
    }
}