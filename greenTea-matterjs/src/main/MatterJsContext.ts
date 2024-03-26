import { injectable } from "inversify";
import * as Matter from "matter-js";

@injectable()
export class MatterJsContext {
    public readonly engine: Matter.Engine = Matter.Engine.create()

    /**
     * key:body id
     * value:entity id
     */
    public readonly bodyEntityMap: Map<number, number> = new Map()

    /**
     * body id -> multiple body id
     */
    public readonly collisionActiveMap: Map<number, number[]> = new Map()
}