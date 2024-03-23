import { Position } from "@Src/common/component/Position.js";
import { Transformation } from "@Src/common/component/Transformation.js";
import { ColliderComponent } from "../component/collider/ColliderComponent.js";
import { Bounding } from "greentea-infrastructure/geometry/types/Bounding";

export const BoundingUtils =  {
    getEntityBounding(
        pos:Position,
        tran:Transformation,
        colliderCom:ColliderComponent
    ):Bounding
    {
        let colliderBounding = colliderCom.collider.getBounding()
        let bounding: Bounding = {
            top: (colliderBounding.top * tran.screenScaleY) + pos.screenY + tran.screenDx,
            bottom: (colliderBounding.bottom * tran.screenScaleY) + pos.screenY + tran.screenDy,
            left: (colliderBounding.left * tran.screenScaleX) + pos.screenX + tran.screenDx,
            right: (colliderBounding.right * tran.screenScaleX) + pos.screenX + tran.screenDy
        }

        return bounding
    }
}