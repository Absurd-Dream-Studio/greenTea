import { Position } from "greentea-core/common/component/Position";
import { Transformation } from "greentea-core/common/component/Transformation";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { ISystem } from "greentea-infrastructure/ecs/system/ISystem";
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig";
import { inject, injectable } from "inversify";
import * as Matter from "matter-js";
import { MatterJsComponent } from "./MatterJsComponent.js";
import { Entity } from "greentea-infrastructure/ecs/entity/Entity";
import { MatterJsTranUtils } from "./MatterJsTranUtils.js";
import { MatterJsContext } from "./MatterJsContext.js";


@injectable()
export class MatterJsRunnerSystem implements ISystem
{
    private readonly engine:Matter.Engine
    private readonly ec:IEntityCollection
    private readonly context:MatterJsContext
    private lastTime:number = 0

    constructor(
        @inject(TypeConfiguration.TYPES.IEntityCollection)
        ec: IEntityCollection,
        context:MatterJsContext
    ) {
        this.context = context
        this.engine = context.engine
        this.ec = ec
    }

    Register(): SystemConfig {
        return {
            onUpdate:()=>this.onUpdate(),
        }
    }

    private onUpdate() {
        const iterator = this.ec.Query()
            .WithAll([
                Position,
                Transformation,
                MatterJsComponent
            ])
            .GetIterator()
        const entities = []
        while (iterator.hasNext()) {
            const item = iterator.next()
            const com = item.components.get(MatterJsComponent)
            if (!item.parent) {
                entities.push(item)
            }
            com.body.commit()
        }

        entities.forEach(item => {
            MatterJsTranUtils.updateBodyTran(item)
        })

        let detlaTime = Date.now() - this.lastTime

        if (this.lastTime === 0) {
            detlaTime = 0
        }

        Matter.Engine.update(this.engine, detlaTime)

        entities.forEach(item => {
            const pos = item.components.get(Position)
            const com = item.components.get(MatterJsComponent)
            const body = com.body.getBody()
            pos.x = body.position.x
            pos.y = body.position.y
        })

        this.lastTime = Date.now()
    }
}