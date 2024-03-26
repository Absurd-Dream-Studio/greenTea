import { Position } from "greentea-core/common/component/Position";
import { Transformation } from "greentea-core/common/component/Transformation";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { ISystem } from "greentea-infrastructure/ecs/system/ISystem";
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig";
import { inject, injectable } from "inversify";
import { MatterJsComponent } from "../component/MatterJsComponent.js";
import { MatterJsTranUtils } from "../utils/MatterJsTranUtils.js";

@injectable()
export class MatterJsMapChildTranSystem implements ISystem
{
    private readonly ec: IEntityCollection

    constructor(
        @inject(TypeConfiguration.TYPES.IEntityCollection)
        ec: IEntityCollection
    ) {
        this.ec = ec
    }
    Register(): SystemConfig {
        return {
            onUpdate: () => this.onUpdate(),
        }
    }

    private onUpdate() {
        const iterator = this.ec.Query().WithAll([
            Position,
            Transformation,
            MatterJsComponent
        ]).GetIterator()
        while (iterator.hasNext()) {
            const item = iterator.next()
            if (item.parent) {
                continue
            }
            MatterJsTranUtils.updateBodyTran(item)
        }
    }
}