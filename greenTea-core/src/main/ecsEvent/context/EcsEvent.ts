import { Newable } from 'greentea-infrastructure/lang/ICommonInterfaces'
import { EcsEventListenerManager } from './EcsEventListenerManager.js'

export class EcsEvent
{
    private eventQueue: EventQueueType[]
    private listenerManager: EcsEventListenerManager

    constructor() {
        this.eventQueue = []
        this.listenerManager = new EcsEventListenerManager()
    }

    pushEvent(
        eventData: Object
    ) {
        this.eventQueue.push(
            {
                eventData: eventData
            }
        )
    }

    getEventQueue(): EventQueueType[] {
        return this.eventQueue
    }

    getListenerManager(): EcsEventListenerManager {
        return this.listenerManager
    }

    clearEventQueue() {
        this.eventQueue = []
    }
}

type EventQueueType =
{
    eventData: Object
}