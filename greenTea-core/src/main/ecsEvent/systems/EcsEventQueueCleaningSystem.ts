import { Runnable } from "greentea-infrastructure/lang/Runnable";
import { injectable } from "inversify";
import { EcsEvent } from "../context/EcsEvent.js";
import { ISystem } from "greentea-infrastructure/ecs/system/ISystem";
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig";

@injectable()
export class EcsEventQueueCleaningSystem implements ISystem
{
    private readonly ecsEvent:EcsEvent

    constructor(ecsEvent:EcsEvent)
    {
        this.ecsEvent = ecsEvent
    }

    Register(): SystemConfig {
        return {
            onUpdate:()=>this.OnUpdate()
        }
    }

    private OnUpdate(): void {
        this.ecsEvent.clearEventQueue()
    }
}