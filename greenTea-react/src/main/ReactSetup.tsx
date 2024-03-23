import { Container } from "inversify";
import { ReactContext } from "./ReactContext.js";
import { createRoot } from "react-dom/client";
import ReactRootContainer from "./ReactRootContainer.js";
import * as React from "react";
import { ReactGlobalContext } from "./ReactGlobalContext.js";
import { ReactScope } from "./ReactScope.js";

export const ReactSetup =
{
    diSetup(diContainer: Container) {
        diContainer.bind(ReactContext).toSelf().inSingletonScope()
        diContainer.bind(ReactGlobalContext).toSelf().inSingletonScope()
    },
    setup(diContainer: Container,
        config: {
            reactContainer: HTMLElement
        }): Promise<void> {

        return new Promise((reslove, reject) => {
            let reactContainer = config.reactContainer
            let reactContext = diContainer.get(ReactContext)
            reactContext.root = createRoot(reactContainer)

            let reactGlobalContext = diContainer.get(ReactGlobalContext)
            reactGlobalContext.globalScope = diContainer.resolve(ReactScope)

            reactContext.root.render(<ReactRootContainer
                diContainer={diContainer}
                OnMounted={reslove}
            ></ReactRootContainer>)
        })
    }
}