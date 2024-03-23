import { IReactRootNode } from "./IReactRootNode.js"
import { ReactScopeContextType } from "./ReactScopeContext.js"

export type ReactRootContainerState = {
    components: Array<ReactRootContainerComponentType>,
}

export type ReactRootContainerComponentType = {
        id: string,
        scopeContext: ReactScopeContextType,
        component: IReactRootNode
}