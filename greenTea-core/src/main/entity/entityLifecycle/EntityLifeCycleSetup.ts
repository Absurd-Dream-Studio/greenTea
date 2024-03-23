import { EntityCollectionEventEnum } from "greentea-infrastructure/ecs/entity/EntityCollectionEventEnum";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { EntityLifecycleComponent, EntityLifecycleEventEnum } from "./EntityLifeCycleComponent.js";

export const EntityLifeCycleSetup = {
    setup(ec: IEntityCollection) {
        let el = ec.GetListenerManager();

        el.addListener(EntityCollectionEventEnum.CREATE, (e) => {
            let com = e.components.get(EntityLifecycleComponent) as EntityLifecycleComponent

            if (com) {
                com.eventListener.evalListener(EntityLifecycleEventEnum.ON_CREATE, { entity: e })
            }
        })

        el.addListener(EntityCollectionEventEnum.DESTROY, (e) => {
            let com = e.components.get(EntityLifecycleComponent) as EntityLifecycleComponent

            if (com) {
                com.eventListener.evalListener(EntityLifecycleEventEnum.ON_REMOVE, { entity: e })
            }
        })
    }
}