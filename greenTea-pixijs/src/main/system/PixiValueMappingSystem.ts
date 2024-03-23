import { Position } from "greentea-core/common/component/Position";
import { Transformation } from "greentea-core/common/component/Transformation";
import { Runnable } from "greentea-infrastructure/lang/Runnable";
import { inject, injectable } from "inversify";
import { PixiComponent } from "../component/PixiComponent.js";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { ISystem } from "greentea-infrastructure/ecs/system/ISystem";
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { PixiUtils } from "../PixiUtils.js";

@injectable()
export class PixiValueMappingSystem implements ISystem {
    private readonly ec: IEntityCollection

    constructor(
        @inject(TypeConfiguration.TYPES.IEntityCollection)
        ec: IEntityCollection
    ) {
        this.ec = ec
    }
    Register(): SystemConfig {
        return {
            onUpdate: () => this.OnUpdate()
        }
    }

    private OnUpdate(): void {
        let iterator = this.ec.Query()
            .WithAll([
                Position,
                Transformation,
                PixiComponent
            ])
            .GetIterator()

        while (iterator.hasNext()) {
            let entity = iterator.next()
            PixiUtils.MapValue(entity)
        }
    }
}