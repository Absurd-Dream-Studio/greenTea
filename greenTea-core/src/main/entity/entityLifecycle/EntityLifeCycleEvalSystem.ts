import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { Runnable } from "greentea-infrastructure/lang/Runnable";
import { inject, injectable } from "inversify";
import { EntityLifecycleComponent, EntityLifecycleEventEnum } from "./EntityLifeCycleComponent.js";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { ISystem } from "greentea-infrastructure/ecs/system/ISystem";
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig";

@injectable()
export class EntityLifeCycleEvalSystem implements ISystem {
    private readonly ec: IEntityCollection

    constructor(
        @inject(TypeConfiguration.TYPES.IEntityCollection) ec: IEntityCollection
    ) {
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

        while (iterator.hasNext()) {
            let item = iterator.next()
            let updaterCom = item.components.get(EntityLifecycleComponent) as EntityLifecycleComponent

            if (!updaterCom.started) {
                updaterCom.eventListener.evalListener(EntityLifecycleEventEnum.ON_START, { entity: item })
                updaterCom.started = true
            }
            updaterCom.eventListener.evalListener(EntityLifecycleEventEnum.ON_UPDATE, { entity: item })
        }
    }

}