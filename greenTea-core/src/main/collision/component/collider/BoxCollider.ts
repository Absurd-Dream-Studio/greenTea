import { Bounding } from "greentea-infrastructure/geometry/types/Bounding";
import { ColliderBase } from "./ColliderBase.js";

export class BoxCollider extends ColliderBase
{
    dx:number = 0
    dy:number = 0
    w:number = 0
    h:number = 0

    getBounding(): Bounding {
        let ret:Bounding = {
            top: this.dy,
            bottom: this.dy + this.h,
            left: this.dx,
            right: this.dx + this.w
        }

        return ret
    }
}