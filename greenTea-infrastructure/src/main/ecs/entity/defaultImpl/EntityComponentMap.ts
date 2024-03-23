import { Newable } from "@Src/lang/ICommonInterfaces.js";
import { IEntityComponentMap } from "../IEntityComponentMap.js";

export class EntityComponentMap implements IEntityComponentMap {
    private readonly map: Map<Function, Object>

    constructor() {
        this.map = new Map()
    }

    init(
        components: Array<Object>
    ) {
        for (let component of components) {
            this.map.set(component.constructor, component)
        }
    }

    get<T>(key: Newable<T>): T {
        return this.map.get(key) as T
    }

    keys():IterableIterator<Function>
    {
        return this.map.keys()
    }

    values():IterableIterator<Object>
    {
        return this.map.values()
    }

    has<T>(key: Newable<T>): boolean {
        return this.map.has(key)
    }
}