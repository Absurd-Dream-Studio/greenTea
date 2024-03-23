import { Container, inject, injectable } from "inversify"
import { ReactContext, ReactEventEnum } from "./ReactContext.js"
import { IReactRootNode } from "./IReactRootNode.js"
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration"

@injectable()
export class ReactScope {
    private readonly diContainer: Container
    private readonly reactContext: ReactContext
    private readonly componentIds: Array<string> = []

    private name:string = "DEFAULT"


    constructor(
        reactContext: ReactContext,
        @inject(TypeConfiguration.TYPES.DIContainer)
        diContainer: Container
    ) {
        this.reactContext = reactContext
        this.diContainer = diContainer
    }

    SetName(name:string){
        this.name = name
    }

    GetName(){
        return this.name
    }

    AddComponent(
        node: IReactRootNode
    ): string {
        let id = crypto.randomUUID()

        this.reactContext.eventListener.evalListener(ReactEventEnum.ADD_COMPONENT, {
            id: id,
            scopeContext: {
                name: this.name,
                diContainer: this.diContainer
            },
            component: node
        })
        this.componentIds.push(id)
        return id
    }

    RemoveComponent(id: string) {
        let scopeInex = this.componentIds.findIndex(item => item === id)

        if (scopeInex === -1) {
            return
        }

        this.reactContext.eventListener.evalListener(ReactEventEnum.REMOVE_COMPONENT, {
            id: id,
        })
        this.componentIds.splice(scopeInex, 1)
    }

    Close() {
        this.componentIds.map(id => id).forEach(id => { this.RemoveComponent(id) })
    }
}
