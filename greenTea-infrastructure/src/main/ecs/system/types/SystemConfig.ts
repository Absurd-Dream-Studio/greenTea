import { ISystemOnClose } from "../lifeCycleInterface/ISystemOnClose.js"
import { ISystemOnStart } from "../lifeCycleInterface/ISystemOnStart.js"
import { ISystemOnUpdate } from "../lifeCycleInterface/ISystemOnUpdate.js"

export type SystemConfig = {
    onStart?:ISystemOnStart,
    onUpdate?:ISystemOnUpdate,
    onClose?:ISystemOnClose,
}