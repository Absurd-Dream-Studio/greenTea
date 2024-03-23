import { AbstractEntityEventHandler } from "@Src/ecs/entity/entityEventListener/AbstractEntityEventHandler.js";
import { EntityCollectionWithEventListener } from "@Src/ecs/entity/entityEventListener/EntityCollectionWithEventListener.js";
import { EntityEventEnum } from "@Src/ecs/entity/entityEventListener/EntityEventEnum.js";
import { EntityEventListenerContext } from "@Src/ecs/entity/entityEventListener/EntityEventListenerContext.js";
import { RelationComponent } from "@Src/ecs/relation/components/RelationComponent.js";
import { RelationDestoryHandler } from "@Src/ecs/relation/destoryHandler/RelationDestoryHandler.js";
import { EntityRelationService } from "@Src/ecs/relation/services/EntityRelationService.js";
import { Entity, IEntityCollection } from "john-s-ecs-library";

export function Test1()
{
  let eventContext = new EntityEventListenerContext()
  let ec = new EntityCollectionWithEventListener(eventContext)
  let entityRelationService = new EntityRelationService(ec)

  eventContext.addHandler(new RelationDestoryHandler(ec))
  eventContext.addHandler(new EchoDestoryHandler())


  let entity = entityRelationService.addEntity({
    components:["1"],
    childs:[
      {
        components:["1.1"],
        childs:[
          {
            components:["1.1.1"]
          }
        ]
      },
      {
        components:["1.2"],
        childs:[
          {
            components:["1.2.1"]
          },
          {
            components:["1.2.2"]
          }
        ]
      },
      {
        components:["1.3"]
      },
      {
        components:["1.4"]
      }
    ]
  })

  console.log('init done : ')
  printEntity(entity , 0)
  console.log('-'.repeat(10))

  ec.RemoveEntity(entity)
}

function printEntity(entity:Entity , level:number)
{
  let pand = '-'.repeat(level * 1)
  console.log(pand + entity.components.get(String))
  let reCom = entity.components.get(RelationComponent) as RelationComponent
  if(reCom.childs)
  {
    for(let e of reCom.childs)
    {
      printEntity(e,level+1)
    }
  }
}

class EchoDestoryHandler extends AbstractEntityEventHandler {
  Handle(entity: Entity): void {
    let relationCom = entity.components.get(RelationComponent) as RelationComponent
    let parnetSize = -1
    let pName = "0"

    if (relationCom.parent) {
      let pRelationCom = relationCom.parent.components.get(RelationComponent) as RelationComponent
      parnetSize = pRelationCom.childs.size
      pName = relationCom.parent.components.get(String) as string
    }
    console.log("destory : ", entity.entityId, entity.components.get(String), pName, parnetSize)
  }
  GetType(): EntityEventEnum {
    return EntityEventEnum.DESTROY
  }
}