import { EntityEventListenerContext } from 'greentea-core/entity/entityEventListener/EntityEventListenerContext'
import * as EntityLifecycleEventHandler from 'greentea-core/entity/entityEventListener/handler/EntityLifecycleEventHandler'
import * as DomElementComponentEventHandler from "greentea-core/entity/entityEventListener/handler/DomElementComponentEventHandler"
import { OnCreateUpdateTransformHandler } from "greentea-core/entity/entityEventListener/handler/OnCreateUpdateTransformHandler"
import { Container } from 'inversify'


import * as PixiEntityEventHandler from 'greentea-pixijs/ecs/PixiEntityEventHandler'

export default function(context:EntityEventListenerContext , diContainer:Container){

    context.addHandler(
        diContainer.resolve(OnCreateUpdateTransformHandler)
    )

    context.addHandler(
        diContainer.resolve(EntityLifecycleEventHandler.OnCreate)
    )
    context.addHandler(
        diContainer.resolve(EntityLifecycleEventHandler.OnDestroy)
    )

    context.addHandler(
        diContainer.resolve(DomElementComponentEventHandler.OnCreate)
    )

    context.addHandler(
        diContainer.resolve(DomElementComponentEventHandler.OnDestory)
    )

    context.addHandler(
        diContainer.resolve(PixiEntityEventHandler.OnCreate)
    )

    context.addHandler(
        diContainer.resolve(PixiEntityEventHandler.OnDestroy)
    )


}
