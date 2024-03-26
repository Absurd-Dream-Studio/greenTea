import { ISystem } from "greentea-infrastructure/ecs/system/ISystem";
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig";
import { inject, injectable } from "inversify";
import { MatterJsContext } from "./MatterJsContext.js";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { MatterJsComponent } from "./MatterJsComponent.js";

@injectable()
export class MatterJsCollisionSetSystem implements ISystem {

    private context: MatterJsContext
    private ec: IEntityCollection

    public constructor(
        @inject(TypeConfiguration.TYPES.IEntityCollection)
        ec: IEntityCollection,
        context: MatterJsContext
    ) {
        this.context = context
        this.ec = ec
    }

    Register(): SystemConfig {
        return {
            onUpdate: () => this.update()
        }
    }

    private update() {
        const iterator = this.ec.Query().WithAll([
            MatterJsComponent
        ]).GetIterator()

        while (iterator.hasNext()) {
            const item = iterator.next()
            const com = item.components.get(MatterJsComponent)
            com.collisionSet.clear()
        }

        this.context.collisionActiveMap.forEach((body_ids, min_body_id) => {
            const k_entity_id = this.context.bodyEntityMap.get(min_body_id)
            const k_entity = this.ec.GetEntityById(k_entity_id)

            if (!k_entity) {
                return
            }

            const k_com = k_entity.components.get(MatterJsComponent)
            if (!k_com) {
                return
            }

            body_ids.forEach((v_body_id) => {
                const v_entity_id = this.context.bodyEntityMap.get(v_body_id)
                const v_entity = this.ec.GetEntityById(v_entity_id)

                if (!v_entity) {
                    return
                }

                const v_com = v_entity.components.get(MatterJsComponent)

                if (!v_com) {
                    return
                }

                k_com.collisionSet.add(v_entity)
                v_com.collisionSet.add(k_entity)
            })
        })
        this.context.collisionActiveMap.clear()
    }
}