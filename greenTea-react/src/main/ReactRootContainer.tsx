import React, { useEffect, useRef, useState } from "react"
import { Container } from "inversify"
import { ReactContext, ReactEventEnum } from "./ReactContext.js"
import { ReactRootContainerState } from "./ReactRootContainerState.js"
import { ReactScopeContext } from "./ReactScopeContext.js"

const ReactRootContainer: React.FC<{
    diContainer: Container,
    OnMounted: () => void
}> = (props) => {
    const inited = useRef(false)
    const [state, setState] = useState<ReactRootContainerState>({
        components: [],
    })
    const stateRef = useRef(state)

    useEffect(() => {
        const reactContext = props.diContainer.get(ReactContext)
        const el = reactContext.eventListener
        const ls = [
            el.addListener(ReactEventEnum.ADD_COMPONENT, (v) => {
                stateRef.current.components.push(v)
                setState({ ...stateRef.current })
            }),

            el.addListener(ReactEventEnum.REMOVE_COMPONENT, (v) => {
                setState(pre => {
                    const index = pre.components.findIndex(item => item.id === v.id)

                    if (index >= 0) {
                        pre.components.splice(index, 1)
                    }

                    return {
                        ...pre
                    }
                })
            })
        ]

        return ()=>{
            ls.forEach(l => el.removeListener(l))
        }
    }, [])

    useEffect(() => {
        if (!inited.current) {
            props.OnMounted()
            inited.current = true
        }
        return () => {
        }
    }, [])

    return (
        <div>
            {state.components.map(item => (
                <ReactScopeContext.Provider value={item.scopeContext}  key={item.id}>
                    <div>
                        <item.component id={item.id} />
                    </div>
                </ReactScopeContext.Provider>
            ))}
        </div>
    )
}

export default ReactRootContainer