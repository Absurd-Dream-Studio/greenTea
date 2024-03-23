import { IState } from "./IState.js";
import { IStateOnEnter } from "./IStateOnEnter.js";
import { IStateOnExit } from "./IStateOnExit.js";
import { IStateOnUpdate } from "./IStateOnUpdate.js";

export class FsmManager<StateContext>
{
    private currentState:IState
    private lastState:IState
    private context:StateContext

    constructor(
        initialState:IState,
        context:StateContext
    )
    {
        this.currentState = initialState
        this.context = context
    }

    init()
    {
        const initStateOnEnter = this.currentState as IStateOnEnter
        if(initStateOnEnter.stateOnEnter)
        {
            initStateOnEnter.stateOnEnter()
        }
    }

    changeState(nextState:IState)
    {
        const nextStateOnEnter = nextState as IStateOnEnter
        const currentStateOnExit = this.currentState as IStateOnExit

        this.lastState = this.currentState
        this.currentState = nextState

        if(nextStateOnEnter.stateOnEnter)
        {
            nextStateOnEnter.stateOnEnter()
        }

        if(currentStateOnExit.stateOnExit)
        {
            currentStateOnExit.stateOnExit(nextState)
        }
    }

    update()
    {
        const currentStateOnUpdate = this.currentState as IStateOnUpdate

        if(currentStateOnUpdate.stateOnUpdate)
        {
            currentStateOnUpdate.stateOnUpdate()
        }
    }

    getLastState():IState
    {
        return this.lastState
    }

    getCurrentState():IState
    {
        return this.currentState
    }
}