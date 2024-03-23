import { Newable } from "greentea-infrastructure/lang/ICommonInterfaces";
import { IEcsEventHandler } from "./IEcsEventHandler.js";

export class EcsEventListenerManager {
    private handlerMap: Map<Function, IEcsEventHandler<any>[]>
    private handlerQuickSearchMap: Map<number, QuickSearchMapValue>
    private handlerCount: number

    constructor(
    ) {
        this.handlerMap = new Map()
        this.handlerQuickSearchMap = new Map()
        this.handlerCount = 0
    }

    registerHandler<T>(
        target: Newable<T>,
        handler: IEcsEventHandler<T>
    ): number {
        let handlers = this.handlerMap.get(target)
        this.handlerCount++;
        if (!handlers) {
            handlers = []
            this.handlerMap.set(target, handlers)
        }
        handlers.push(handler)
        this.handlerQuickSearchMap.set(this.handlerCount,
            {
                target: target,
                handler: handler
            })
        return this.handlerCount
    }

    removeHandler(handlerId: number) {
        let value = this.handlerQuickSearchMap.get(handlerId)
        let handlers = this.handlerMap.get(value.target)
        let index = handlers.findIndex(obj => {
            return obj === value.handler
        })
        handlers.splice(index, 1)

        if (handlers.length === 0) {
            this.handlerMap.delete(value.target)
        }
    }

    evalHandler<T extends Object>(event: T): void {
        const handlers = this.handlerMap.get(event.constructor)
        if (!handlers) {
            return
        }
        handlers.forEach(handler => { handler(event) })
    }
}

type QuickSearchMapValue = {
    target:Function,
    handler:IEcsEventHandler<any>
}