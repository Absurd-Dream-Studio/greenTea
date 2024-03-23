import { Entity } from "greentea-infrastructure/ecs/entity/Entity";
import { Position } from "greentea-core/common/component/Position";
import { Transformation } from "greentea-core/common/component/Transformation";
import { PixiComponent } from "./component/PixiComponent.js";

export const PixiUtils = {
    MapValue(entity:Entity)
    {
        let pos = entity.components.get(Position)
        let tran = entity.components.get(Transformation)

        let pixiCom = entity.components.get(PixiComponent)

        let displayObj = pixiCom.container
        displayObj.x = pos.x + tran.dx
        displayObj.y = pos.y + tran.dy
        displayObj.zIndex = pos.z

        displayObj.transform.scale.x = tran.scaleX
        displayObj.transform.scale.y = tran.scaleY
    }
}