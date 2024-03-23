import { ListenerManager } from "greentea-infrastructure/designPattern/behavioral/listener/ListenerManager";
import { PointerValue } from "../types/PointerValue.js";

export class GestureEventTriggerComponent {
    eventListener: ListenerManager<GestureEventTriggerEventEnum, GestureEventTriggerEventTypeMap> = new ListenerManager()
}

export enum GestureEventTriggerEventEnum {
    /**
     * @description
     * This event is triggered when entity is clicked.
     */
    ON_CLICK,
    /**
     * @description
     * This event is triggered when click on entity's pointer is move.
     */
    ON_MOVE,
    /**
     * @description
     * This event is triggered when entity is not clicked by pointer before and pointer move in.
     */
    ON_ENTER,
    /**
     * @description
     * This event is triggered when entity is clicked and entity is not focus entity.
     */
    ON_FOCUS_IN,
    /**
     * @description
     * This event is triggered when other entity is focused and entity is focus entity.
     */
    ON_FOCUS_OUT,
    /**
     * @description
     * This event is triggered when entity is clicked and pointer is not move in a period of time.
     */
    ON_LONG_PRESS,
    /**
     * @description
     * This event is triggered when entity is clicked and pointer is up and pointer is within entity.
     */
    ON_RELEASE,
    /**
     * @description
     * This event is triggered when click on entity's pointer is up.
     */
    ON_POINTER_UP,
    /**
     * @description
     * This event is triggered when click on entity's pointer is cancel.
     */
    ON_POINTER_CANCEL,
}

export interface GestureEventTriggerEventTypeMap {
    [GestureEventTriggerEventEnum.ON_CLICK]: PointerValue & {},
    [GestureEventTriggerEventEnum.ON_MOVE]: PointerValue & {},
    [GestureEventTriggerEventEnum.ON_ENTER]: PointerValue & {},
    [GestureEventTriggerEventEnum.ON_FOCUS_IN]: PointerValue & {},
    [GestureEventTriggerEventEnum.ON_FOCUS_OUT]: PointerValue & {},
    [GestureEventTriggerEventEnum.ON_LONG_PRESS]: PointerValue & {},
    [GestureEventTriggerEventEnum.ON_RELEASE]: PointerValue & {},
    [GestureEventTriggerEventEnum.ON_POINTER_UP]: PointerValue & {},
    [GestureEventTriggerEventEnum.ON_POINTER_CANCEL]: PointerValue & {},
}