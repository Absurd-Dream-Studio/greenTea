import { inject, injectable } from "inversify";
import { PixiComponent } from "../component/PixiComponent.js";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { ISystem } from "greentea-infrastructure/ecs/system/ISystem";
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";

@injectable()
export class PixiRenderSystem implements ISystem {
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
                PixiComponent
            ]).GetIterator()

        while (iterator.hasNext()) {
            let entity = iterator.next()
            let com = entity.components.get(PixiComponent)

            if (com.node && com.property) {
                com.node.render(com.node.displayObj, com.property)
            }
        }
    }
}