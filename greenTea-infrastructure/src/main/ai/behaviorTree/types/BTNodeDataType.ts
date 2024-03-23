import { IBTNodeExecutor } from "../IBTNodeExecutor.js";


export type BTNodeDataType<T> = {
  execute: IBTNodeExecutor<T>;
};
