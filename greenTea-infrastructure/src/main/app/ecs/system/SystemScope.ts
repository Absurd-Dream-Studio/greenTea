import { ISystem } from "@Src/ecs/system/ISystem.js";
import { SystemTypeEnum } from "./SystemTypeEnum.js";
import { ISystemScope } from "./ISystemScope.js";
import { SystemArrayValueType, SystemContextState } from "./SystemContextState.js";

export class SystemScope implements ISystemScope {
    private readonly systemContextState: SystemContextState
    private readonly addedSystems: Array<{
        type: SystemTypeEnum,
        system: Function
    }>

    constructor(
        systemContextState: SystemContextState
    ) {
        this.systemContextState = systemContextState
        this.addedSystems = []
    }

    addSystemBefore(type: SystemTypeEnum, before: Function, systems: (Object & ISystem)[]): this {
        const state = this.systemContextState
        state.changed = true
        let handleArray: Array<SystemArrayValueType> = state.getRawSystems(type)
        let index = handleArray.findIndex((value) => {
            return value.consturctor === before
        })

        if (index === -1) {
            index = 0
        }

        handleArray.splice(
            index,
            0,
            ...systems.map(
                (value) => {
                    return {
                        consturctor: value.constructor,
                        config: value.Register()
                    }
                }
            )
        )

        systems.forEach(x => {
            this.addedSystems.push({
                type: type,
                system: x.constructor
            })
        })

        return this
    }

    addSystemAfter(type: SystemTypeEnum, after: Function, systems: (Object & ISystem)[]): this {
        const state = this.systemContextState
        state.changed = true
        let handleArray: Array<SystemArrayValueType> = state.getRawSystems(type)
        let index = handleArray.findIndex((value) => {
            return value.consturctor === after
        })

        if (index === -1) {
            index = handleArray.length - 1
        }

        handleArray.splice(
            index + 1,
            0,
            ...systems.map(
                (value) => {
                    return {
                        consturctor: value.constructor,
                        config: value.Register()
                    }
                }
            )
        )

        systems.forEach(x => {
            this.addedSystems.push({
                type: type,
                system: x.constructor
            })
        })

        return this
    }

    removeSystem(type: SystemTypeEnum, system: Function): this {
        const state = this.systemContextState
        const handleArray = state.getRawSystems(type)
        const removeIndex = handleArray.findIndex(x => x.consturctor === system)
        const systemConfig = handleArray[removeIndex]
        const haveRemoveIndex = removeIndex !== -1
        if (haveRemoveIndex && systemConfig && systemConfig.config.onClose) {
            systemConfig.config.onClose()
        }

        if (haveRemoveIndex) {
            handleArray.splice(removeIndex, 1)
        }

        return this
    }

    close(): this {
        const state = this.systemContextState
        state.changed = true

        this.addedSystems.forEach(system => {
            this.removeSystem(system.type, system.system)
        })
        return this
    }
}