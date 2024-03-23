import { Bounding } from "greentea-infrastructure/geometry/types/Bounding";

export abstract class ColliderBase
{
    abstract getBounding():Bounding
}