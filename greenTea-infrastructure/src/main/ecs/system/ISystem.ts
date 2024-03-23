import { Newable } from "@Src/lang/ICommonInterfaces.js";
import { SystemConfig } from "./types/SystemConfig.js";

export interface ISystem{
    Register():SystemConfig
}