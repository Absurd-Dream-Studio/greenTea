import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { ISystem } from "greentea-infrastructure/ecs/system/ISystem";
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig";
import { inject, injectable } from "inversify";
import { EntityLifecycleComponent, EntityLifecycleEventEnum } from "./EntityLifeCycleComponent.js";

@injectable()
export class EntityLifeCycleFrameUpdateSystem implements ISystem
{
    private readonly ec:IEntityCollection

    constructor(
        @inject(TypeConfiguration.TYPES.IEntityCollection)
        ec:IEntityCollection,
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
        let iterator = this.ec.Query()
        .WithAll([
            EntityLifecycleComponent
        ])
        .GetIterator()

        // let deltaMS: number = this.pixiContext.app.ticker.deltaMS
        // TODO change it to real deltaMS if needed
        let deltaMS: number = 0
        while(iterator.hasNext())
        {
            let item = iterator.next()
            let com = item.components.get(EntityLifecycleComponent)
            com.eventListener.evalListener(EntityLifecycleEventEnum.ON_FRAME_UPDATE, { deltaMs: deltaMS, entity: item })
        }
    }
}