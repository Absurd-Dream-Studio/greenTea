import { IListener } from "./IListener.js";

export class ListenerManager<EventKeyT extends number,
    ValueMap extends { [key in EventKeyT]: any }> {
    private readonly listenerMap:Map<EventKeyT,Set<IListener<any>>>
    private readonly listenerKeyMap:Map<IListener<any>,EventKeyT>

    private readonly onceListenerMap:Map<EventKeyT,Set<IListener<any>>>

    constructor()
    {
        this.listenerMap = new Map()
        this.listenerKeyMap = new Map()
        this.onceListenerMap = new Map()
    }

    addListener<K extends EventKeyT>(key:K,listener:IListener<ValueMap[K]>):IListener<ValueMap[K]>
    {
        let listenerSet = this.listenerMap.get(key);

        if(!listenerSet)
        {
            listenerSet = new Set()
            this.listenerMap.set(key,listenerSet)
        }

        this.listenerKeyMap.set(listener , key)
        listenerSet.add(listener)
        return listener
    }

    once<K extends EventKeyT>(key: K, listener: IListener<ValueMap[K]>): IListener<ValueMap[K]> {
        let listenerSet = this.onceListenerMap.get(key);
        if (!listenerSet) {
            listenerSet = new Set()
            this.onceListenerMap.set(key, listenerSet)
        }

        listenerSet.add(listener)
        return listener
    }

    evalListener<K extends EventKeyT>(key:K,value?:ValueMap[K])
    {
        if (this.listenerMap.has(key)) {
            this.listenerMap.get(key)
                .forEach((listener) => {
                    listener(value)
                })
        }

        if (this.onceListenerMap.has(key)) {
            this.onceListenerMap.get(key)
                .forEach((listener) => {
                    listener(value)
                })
            this.onceListenerMap.delete(key)
        }
    }

    removeListener<T>(listener:IListener<T>)
    {
        let key = this.listenerKeyMap.get(listener)

        if(key === undefined || key === null)
        {
            return
        }

        let set = this.listenerMap.get(key)
        this.listenerKeyMap.delete(listener)

        if(!set)
        {
            return
        }

        set.delete(listener)

        if(set.size === 0)
        {
            this.listenerMap.delete(key)
        }
    }

}