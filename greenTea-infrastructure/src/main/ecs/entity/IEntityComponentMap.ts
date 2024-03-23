import { Newable } from "@Src/lang/ICommonInterfaces.js";

export interface IEntityComponentMap{
    init(components: Array<Object>):void;
    get<T>(key:Newable<T>):T
    has<T>(key:Newable<T>):boolean
    keys():IterableIterator<Function>;
    values():IterableIterator<Object>;
}