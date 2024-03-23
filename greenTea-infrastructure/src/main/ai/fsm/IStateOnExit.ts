import { IState } from "./IState.js";

export interface IStateOnExit
{
    stateOnExit(nextState:IState):void
}