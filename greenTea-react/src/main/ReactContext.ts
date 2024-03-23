import { Dispatch, SetStateAction } from "react";
import { Container, injectable } from "inversify";
import { Root } from "react-dom/client";
import { ListenerManager } from "greentea-infrastructure/designPattern/behavioral/listener/ListenerManager";
import { ReactRootContainerComponentType, ReactRootContainerState } from "./ReactRootContainerState.js";
import { ReactScope } from "./ReactScope.js";
import { IReactRootNode } from "./IReactRootNode.js";

@injectable()
export class ReactContext {
    eventListener: ListenerManager<ReactEventEnum, ReactEventTypeMap> = new ListenerManager()
    root: Root
}

export enum ReactEventEnum {
    ADD_COMPONENT,
    REMOVE_COMPONENT,
}

export interface ReactEventTypeMap {
    [ReactEventEnum.ADD_COMPONENT]: ReactRootContainerComponentType,
    [ReactEventEnum.REMOVE_COMPONENT]: {
        id: string
    }
}
