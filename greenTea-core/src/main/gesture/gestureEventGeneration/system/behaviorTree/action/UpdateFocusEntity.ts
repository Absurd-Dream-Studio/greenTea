import { Position } from "@Src/common/component/Position.js";
import { GestureBtContext } from "../GestureBtContext.js";
import { BTNodeResultEnum } from "greentea-infrastructure/ai/behaviorTree/BTNodeResultEnum";
import Action from "greentea-infrastructure/ai/behaviorTree/tags/execution/Action";
import { Entity } from "greentea-infrastructure/ecs/entity/Entity";

export default Action((context: GestureBtContext) => {
    context.foucsEntity = getFocusEntity(context.inPointEntities)
    return BTNodeResultEnum.SUCCESS
})

function getFocusEntity(entities: Entity[]): Entity {
    let ret: Entity = undefined
    entities.forEach(entity => {
        if (ret === undefined) {
            ret = entity
        }
        let currPos = ret.components.get(Position) as Position
        let pos = entity.components.get(Position) as Position
        if (currPos.screenZ < pos.screenZ) {
            ret = entity
        }
    })
    return ret
}