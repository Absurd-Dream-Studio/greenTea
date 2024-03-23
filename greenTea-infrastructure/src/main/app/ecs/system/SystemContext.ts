import { SystemConfig } from "@Src/ecs/system/types/SystemConfig.js";
import { injectable } from "inversify";
import { ISystemContext } from "./ISystemContext.js";
import { SystemContextState } from "./SystemContextState.js";
import { ISystemScope } from "./ISystemScope.js";
import { SystemTypeEnum } from "./SystemTypeEnum.js";
import { SystemScope } from "./SystemScope.js";

@injectable()
export class SystemContext implements ISystemContext {

    private state: SystemContextState
    private cachedFixedUpdateSystems: Array<SystemConfig>
    private cachedFrameUpdateSystems: Array<SystemConfig>

    constructor() {
        this.state = new SystemContextState()
    }

    createScope(): ISystemScope {
        return new SystemScope(this.state)
    }

    getSystems(type: SystemTypeEnum): Array<SystemConfig> {
        if (this.state.changed) {
            this.doMapCache()
            this.state.changed = false
        }

        switch (type) {
            case SystemTypeEnum.FIXED_UPDATE:
                return this.cachedFixedUpdateSystems
            case SystemTypeEnum.FRAME_UPDATE:
                return this.cachedFrameUpdateSystems
        }
    }

    private doMapCache() {
        this.cachedFixedUpdateSystems = this.state.fixedUpdateSystems.map((value) => value.config)
        this.cachedFrameUpdateSystems = this.state.frameUpdateSystems.map((value) => value.config)
    }

}