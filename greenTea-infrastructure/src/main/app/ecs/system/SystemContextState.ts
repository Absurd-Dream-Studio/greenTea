import { SystemConfig } from "@Src/ecs/system/types/SystemConfig.js"
import { SystemTypeEnum } from "./SystemTypeEnum.js"

export class SystemContextState {
    fixedUpdateSystems: Array<SystemArrayValueType> = []
    frameUpdateSystems: Array<SystemArrayValueType> = []
    changed = true

    getRawSystems(type: SystemTypeEnum): Array<SystemArrayValueType> {
        switch (type) {
            case SystemTypeEnum.FIXED_UPDATE:
                return this.fixedUpdateSystems
            case SystemTypeEnum.FRAME_UPDATE:
                return this.frameUpdateSystems
        }
    }
}

export type SystemArrayValueType = {
    consturctor: Function,
    config: SystemConfig
}