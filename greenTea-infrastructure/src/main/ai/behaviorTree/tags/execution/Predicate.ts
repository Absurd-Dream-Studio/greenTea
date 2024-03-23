import { BTNodeResultEnum } from "../../BTNodeResultEnum.js";
import Action from "./Action.js";

const decorate = function <T>(execute: (context: T) => boolean) {
    return Action((context: T) => {

        let result = execute(context)
        return result ? BTNodeResultEnum.SUCCESS : BTNodeResultEnum.FAILURE
    })
}

export default decorate;