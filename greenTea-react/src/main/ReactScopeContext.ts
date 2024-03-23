import { Container } from "inversify"
import { ReactScope } from "./ReactScope.js"
import { createContext } from "react"

export const ReactScopeContext = createContext<ReactScopeContextType>({
    name: "DEFAULT",
    diContainer: undefined
})

export type ReactScopeContextType = {
    name: string,
    diContainer: Container,
}