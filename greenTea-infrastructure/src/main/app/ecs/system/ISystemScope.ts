import { ISystem } from "@Src/ecs/system/ISystem.js";
import { SystemTypeEnum } from "./SystemTypeEnum.js";

export interface ISystemScope {
    addSystemBefore(type: SystemTypeEnum, before: Function, systems: Array<Object & ISystem>): this
    addSystemAfter(type: SystemTypeEnum, after: Function, systems: Array<Object & ISystem>): this
    removeSystem(type: SystemTypeEnum, system: Function): this
    close(): this
}