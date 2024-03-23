import { Runnable } from "greentea-infrastructure/lang/Runnable"
import { injectable } from "inversify"
import { ISystem } from "greentea-infrastructure/ecs/system/ISystem"
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig"
import { EcsEvent } from "../context/EcsEvent.js"

@injectable()
export class EcsEventQueueProcessSystem implements ISystem
{
    ecsEvent: EcsEvent

    constructor(
        ecsEvent: EcsEvent
    ) {
        this.ecsEvent = ecsEvent
    }

    Register(): SystemConfig {
        return {
            onUpdate: () => this.OnUpdate()
        }
    }

    private OnUpdate(): void {
        let queue = this.ecsEvent.getEventQueue()
        queue.forEach((item) => {
            this.ecsEvent.getListenerManager().evalHandler(item.eventData)
        })
    }
}