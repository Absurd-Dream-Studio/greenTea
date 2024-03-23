import * as BTExecutor from "@Src/stateControl/behaviorTree/BTExecutor.js"
import { BTNodeResultEnum } from "@Src/stateControl/behaviorTree/BTNodeResultEnum.js"
import FallBack from "@Src/stateControl/behaviorTree/tags/controlFlow/FallBack.js"
import Parallel from "@Src/stateControl/behaviorTree/tags/controlFlow/Parallel.js"
import Seq from "@Src/stateControl/behaviorTree/tags/controlFlow/Seq.js"
import Action from "@Src/stateControl/behaviorTree/tags/execution/Action.js"

export default function () {
    BTExecutor.execute<ContextType>(
        {
            msg:'hello world'
        },
        FallBack([
            Parallel([
                Seq([
                    Action((context: ContextType) => {
                        console.log('seq 1 running')
                        return BTNodeResultEnum.RUNNING
                    }),
                    Action((context: ContextType) => {
                        throw new Error('after seq 1 running, seq 2 should not be executed')
                        return BTNodeResultEnum.RUNNING
                    }),
                ]),
                Action((context: ContextType) => {
                    console.log('parallel 2 running')
                    return BTNodeResultEnum.SUCCESS
                }),
            ]),
            Action((context: ContextType) => {
                throw new Error('after fallback 1 running, fallback 2 should not be executed')
            })
        ])
        .getNode()
    )
}

type ContextType = {
    msg:string
}