import { ListenerManager } from "greentea-infrastructure/designPattern/behavioral/listener/ListenerManager"

export class MatterJsBodyContainer {
    private lm:ListenerManager<MatterJsBodyEventEnum,MatterJsEventTypeMap>
    private body:Matter.Body
    private actions: Array<() => void> = []

    constructor() {
        this.lm = new ListenerManager()
    }

    public setBody(body: Matter.Body) {
        this.actions.push(() => {
            this.lm.evalListener(MatterJsBodyEventEnum.BODY_CHANGED, { oldBody: this.body, newBody: body })
            this.body = body
        })
    }

    public getBody() {
        return this.body
    }

    public commit() {
        this.actions.forEach((action) => { action() })
        this.actions = []
    }

    public getListenerManager() {
        return this.lm
    }
}

export enum MatterJsBodyEventEnum {
    BODY_CHANGED
}

export interface MatterJsEventTypeMap
{
    [MatterJsBodyEventEnum.BODY_CHANGED]: { oldBody: Matter.Body, newBody: Matter.Body }
}