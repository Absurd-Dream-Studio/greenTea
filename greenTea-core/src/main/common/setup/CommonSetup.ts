import { EntityCollectionEventEnum } from "greentea-infrastructure/ecs/entity/EntityCollectionEventEnum";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { UpdateTransformUtils } from "../utils/UpdateTransformUtils.js";

export const CommonSetup = {
    setup(ec: IEntityCollection) {
        let el = ec.GetListenerManager()
        {
            el.addListener(EntityCollectionEventEnum.CREATE, (e) => {
                let arr = [e]
                while (arr.length > 0) {
                    let entity = arr.pop()
                    UpdateTransformUtils.Update(entity)
                    entity.child.forEach(child => {
                        arr.push(child)
                    })
                }
            })
        }
    }
}