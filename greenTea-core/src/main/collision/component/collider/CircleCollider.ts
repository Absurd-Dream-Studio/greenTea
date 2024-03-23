import { Bounding } from "greentea-infrastructure/geometry/types/Bounding"
import { ColliderBase } from "./ColliderBase.js"

export class CircleCollider extends ColliderBase
{
    dx:number = 0
    dy:number = 0
    r:number = 0

    getBounding(): Bounding {
        let ret:Bounding =
        {
            top: this.dy - this.r,
            bottom: this.dy + this.r,
            left: this.dx - this.r,
            right: this.dx + this.r
        }

        return ret
    }
}