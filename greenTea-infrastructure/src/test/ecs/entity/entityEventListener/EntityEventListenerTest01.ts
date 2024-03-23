import { AbstractEntityEventHandler } from "@Src/ecs/entity/entityEventListener/AbstractEntityEventHandler.js";
import { EntityCollectionWithEventListener } from "@Src/ecs/entity/entityEventListener/EntityCollectionWithEventListener.js";
import { EntityEventEnum } from "@Src/ecs/entity/entityEventListener/EntityEventEnum.js";
import { EntityEventListenerContext } from "@Src/ecs/entity/entityEventListener/EntityEventListenerContext.js";
import { Entity, IEntityCollection } from "john-s-ecs-library";
import { compareToEquals } from "typescript-collections/dist/lib/util.js";

export function EntityEventListenerTest01() {
    let listenerContext = new EntityEventListenerContext()
    let ec: IEntityCollection = new EntityCollectionWithEventListener(listenerContext)

    listenerContext.addHandler(new EchoDestoryHandler())
    listenerContext.addHandler(new EchoCreateHandler())

    let a11Entity:Entity

    let entity = ec.AddEntityWithChild({
        component:['A'],
        child:[
            {
                component:['A1'],
                child:[
                    {
                        component:['A1.1'],
                        bindTo:(e)=>a11Entity = e,
                        child:[
                            {
                                component:['A1.1.1'],
                            }
                        ]
                    }
                ]
            },
            {
                component:['A2'],
            }
        ]
    })

    console.log('entity created')
    ec.RemoveEntity(a11Entity)
    console.log('a11 entity removed')
    console.log('append child to entity')
    ec.AddChild(entity , [
        {
            component:["append1"],
            child:[
                {
                    component:["append1.1"]
                }
            ]
        }
    ])
    ec.RemoveEntity(entity)
    console.log('entity removed')

}

class EchoDestoryHandler extends AbstractEntityEventHandler {
    Handle(entity: Entity): void {
        console.log(entity.components.get(String), ' destoryed')
    }
    GetType(): EntityEventEnum {
        return EntityEventEnum.DESTROY
    }
}

class EchoCreateHandler extends AbstractEntityEventHandler {
    Handle(entity: Entity): void {
        console.log(entity.components.get(String), ' created')
    }
    GetType(): EntityEventEnum {
        return EntityEventEnum.CREATE
    }
}