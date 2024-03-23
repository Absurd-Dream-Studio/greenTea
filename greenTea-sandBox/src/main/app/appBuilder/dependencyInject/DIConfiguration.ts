import { CollisionMap } from "greentea-core/collision/systemResource/CollisionMap"
import { EcsEvent } from "greentea-core/ecsEvent/context/EcsEvent"
import { Container, inject, typeConstraint } from "inversify"
import { IEntityCollection } from "greentea-infrastructure/ecs/collection/IEntityCollection"
import TypeConfiguration from "./TypeConfiguration.js"
import { OneTimeEventContext } from "greentea-core/ecsEvent/context/OneTimeEventContext"
import { SceneContext } from "greentea-core/scene/SceneContext"
import { EntityEventListenerContext } from "greentea-core/entity/entityEventListener/EntityEventListenerContext"
import { EntityCollectionWithEventListener } from "greentea-core/entity/entityEventListener/EntityCollectionWithEventListener"
import { PixiContext } from "greentea-pixijs/PixiContext"
import { PixiEcsService } from "greentea-pixijs/ecs/PixiEcsService"
import { GestureContext } from "greentea-core/gesture/gestureEventGeneration/GestureContext"
import { SystemContext } from "greentea-infrastructure/app/ecs/system/SystemContext"

export function DIConfiguration(
  diContainer: Container
) {
  diContainer.bind(TypeConfiguration.Infrastructure.DIContainer).toConstantValue(diContainer)
  diContainer.bind(TypeConfiguration.Infrastructure.ISystemContext)
    .toDynamicValue(
      () => {
        return new SystemContext
      }
    ).inSingletonScope()

  diContainer.bind<IEntityCollection>(TypeConfiguration.Infrastructure.IEntityCollection).to(EntityCollectionWithEventListener)
    .inSingletonScope()

  diContainer.bind<EntityEventListenerContext>(EntityEventListenerContext).toSelf().inSingletonScope()

  diContainer.bind(TypeConfiguration.Infrastructure.Canvas)
    .toDynamicValue((context) => {
      return document.getElementById("main-layer")
    }).inSingletonScope()

  diContainer.bind(TypeConfiguration.Infrastructure.GestureListeningElement)
    .toDynamicValue((context) => {
      return document.getElementById("main-layer")
    }).inSingletonScope()

  diContainer.bind(TypeConfiguration.Infrastructure.DomEntityMainContainer)
    .toDynamicValue((context) => {
      return document.getElementById("main-container")
    }).inSingletonScope()

  diContainer.bind<CollisionMap>(CollisionMap).toDynamicValue((context) => {
    return new CollisionMap(100)
  }).inSingletonScope()

  diContainer.bind<EcsEvent>(EcsEvent).toDynamicValue((context) => {
    return new EcsEvent()
  }).inSingletonScope()

  diContainer.bind<OneTimeEventContext>(OneTimeEventContext).toConstantValue(new OneTimeEventContext())
  diContainer.bind(GestureContext).toSelf().inSingletonScope()

  //pixi
  {
    diContainer.bind(PixiContext).toSelf().inSingletonScope()
    diContainer.bind(PixiEcsService).toSelf().inSingletonScope()
  }

  diContainer.bind(SceneContext).toSelf().inSingletonScope()

}