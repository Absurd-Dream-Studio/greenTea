import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { Runnable } from "greentea-infrastructure/lang/Runnable";
import { inject, injectable } from "inversify";
import { Position } from "../component/Position.js";
import { Transformation } from "../component/Transformation.js";
import { UpdateTransformUtils } from "../utils/UpdateTransformUtils.js";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { ISystem } from "greentea-infrastructure/ecs/system/ISystem";
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig";

@injectable()
export class UpdateTransformSystem implements ISystem {
    private readonly ec: IEntityCollection

    constructor(
        @inject(TypeConfiguration.TYPES.IEntityCollection) ec: IEntityCollection
    ) {
        this.ec = ec
    }

    Register(): SystemConfig {
        return {
            onUpdate:()=>this.Run()
        }
    }

    Run(): void {
        let iterator = this.ec.Query()
            .WithAll([
                Position,
                Transformation
            ])
            .GetIterator()

        while (iterator.hasNext()) {
            let item = iterator.next()
            if (item.parent) {
                continue
            }

            let arr = [item]
            while (arr.length > 0) {
                let entity = arr.pop()
                UpdateTransformUtils.Update(entity)
                entity.child.forEach(child => {
                    arr.push(child)
                })
            }
        }
    }
}