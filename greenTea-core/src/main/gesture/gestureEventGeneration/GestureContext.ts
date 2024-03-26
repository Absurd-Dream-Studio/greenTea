import { Entity } from "greentea-infrastructure/ecs/entity/Entity";
import { injectable } from "inversify";

@injectable()
export class GestureContext {
    dx: number = 0
    dy: number = 0
    sx: number = 1
    sy: number = 1

    fetchInPointEntities: (worldX:number,worldY:number) => Entity[] = () => []
}