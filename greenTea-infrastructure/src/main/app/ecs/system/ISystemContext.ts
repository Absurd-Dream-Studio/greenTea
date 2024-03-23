import { SystemTypeEnum } from "./SystemTypeEnum.js";
import { SystemConfig } from "@Src/ecs/system/types/SystemConfig.js";
import { ISystemScope } from "./ISystemScope.js";


export interface ISystemContext {
    createScope():ISystemScope
    getSystems(type: SystemTypeEnum):Array<SystemConfig>
}
