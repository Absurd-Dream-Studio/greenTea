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
        Seq([
            Action((context:ContextType) => {
                console.log('seq 1 pass')
                return BTNodeResultEnum.SUCCESS
            }),
            Action((context:ContextType) => {
                console.log('seq 2 pass')
                return BTNodeResultEnum.SUCCESS
            }),
            FallBack([
                Action((context:ContextType) => {
                    console.log('fallback 1 pass')
                    return BTNodeResultEnum.SUCCESS
                }),
                Action((context:ContextType) => {
                    throw new Error('after fallback 1 pass, fallback 2 should not be executed')
                }),
            ]),
            FallBack([
                Action((context:ContextType) => {
                    console.log('fallback 2.1 fail')
                    return BTNodeResultEnum.FAILURE
                }),
                Action((context:ContextType) => {
                    console.log('fallback 2.2 pass')
                    return BTNodeResultEnum.SUCCESS
                }),
            ]),
            Parallel([
                Action((context:ContextType) => {
                    console.log('parallel 1 fail')
                    return BTNodeResultEnum.FAILURE
                }),
                Action((context:ContextType) => {
                    console.log('parallel 2 fail')
                    return BTNodeResultEnum.FAILURE
                }),
                Action((context:ContextType) => {
                    console.log('parallel 3 pass')
                    return BTNodeResultEnum.SUCCESS
                }),
                Action((context:ContextType) => {
                    console.log('parallel 4 fail')
                    return BTNodeResultEnum.FAILURE
                })
            ]),
            Action((context:ContextType) => {
                console.log('all test pass')
                console.log(context.msg)
                return BTNodeResultEnum.SUCCESS
            })
        ])
        .getNode()
    )
}

type ContextType = {
    msg:string
}