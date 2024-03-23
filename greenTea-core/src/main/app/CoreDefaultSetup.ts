import { AnimationClearSystem } from "@Src/animation/systems/AnimationClearSystem.js";
import { AnimationDefaultHandleSystem } from "@Src/animation/systems/AnimationDefaultHandleSystem.js";
import { AnimationDurationSystem } from "@Src/animation/systems/AnimationDurationSystem.js";
import { CollisionSystem } from "@Src/collision/system/CollisionSystem.js";
import { CollisionMap } from "@Src/collision/systemResource/CollisionMap.js";
import { CommonSetup } from "@Src/common/setup/CommonSetup.js";
import { UpdateTransformSystem } from "@Src/common/system/UpdateTransformSystem.js";
import { EcsEvent } from "@Src/ecsEvent/context/EcsEvent.js";
import { EcsEventQueueCleaningSystem } from "@Src/ecsEvent/systems/EcsEventQueueCleaningSystem.js";
import { EcsEventQueueProcessSystem } from "@Src/ecsEvent/systems/EcsEventQueueProcessSystem.js";
import { EntityLifeCycleEvalSystem } from "@Src/entity/entityLifecycle/EntityLifeCycleEvalSystem.js";
import { EntityLifeCycleFrameUpdateSystem } from "@Src/entity/entityLifecycle/EntityLifeCycleFrameUpdateSystem.js";
import { EntityLifeCycleSetup } from "@Src/entity/entityLifecycle/EntityLifeCycleSetup.js";
import { GestureContext } from "@Src/gesture/gestureEventGeneration/GestureContext.js";
import { GestureSystem } from "@Src/gesture/gestureEventGeneration/system/GestureSystem.js";
import { SceneContext } from "@Src/scene/SceneContext.js";
import { ISystemScope } from "greentea-infrastructure/app/ecs/system/ISystemScope";
import { SystemContext } from "greentea-infrastructure/app/ecs/system/SystemContext";
import { SystemTypeEnum } from "greentea-infrastructure/app/ecs/system/SystemTypeEnum";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { EntityCollection } from "greentea-infrastructure/ecs/entity/defaultImpl/EntityCollection";
import { Container } from "inversify";

export const CoreDefaultSetup = {
  diSetup(
    diContainer: Container,
    config: {
      Canvas: HTMLCanvasElement,
      GestureListeningElement: HTMLElement,
      DomEntityMainContainer: HTMLElement,
      collisionMapSize: number
    }
  ) {
    diContainer.bind(TypeConfiguration.TYPES.DIContainer).toConstantValue(diContainer)
    diContainer.bind(TypeConfiguration.TYPES.ISystemContext).toConstantValue(new SystemContext())

    diContainer.bind<IEntityCollection>(TypeConfiguration.TYPES.IEntityCollection).to(EntityCollection)
      .inSingletonScope()

    diContainer.bind(TypeConfiguration.TYPES.Canvas).toConstantValue(config.Canvas)
    diContainer.bind(TypeConfiguration.TYPES.GestureListeningElement).toConstantValue(config.GestureListeningElement)
    diContainer.bind(TypeConfiguration.TYPES.DomEntityMainContainer).toConstantValue(config.DomEntityMainContainer)

    diContainer.bind(CollisionMap).toConstantValue(new CollisionMap(config.collisionMapSize))
    diContainer.bind(EcsEvent).toConstantValue(new EcsEvent())

    diContainer.bind(GestureContext).toSelf().inSingletonScope()
    diContainer.bind(SceneContext).toSelf().inSingletonScope()
  },
  setup(diContainer:Container)
  {
    const ec = diContainer.get<IEntityCollection>(TypeConfiguration.TYPES.IEntityCollection)

    CommonSetup.setup(ec)
    EntityLifeCycleSetup.setup(ec)
  },
  systemSetup(scope: ISystemScope, diContainer: Container) {
    scope.addSystemAfter(SystemTypeEnum.FIXED_UPDATE, undefined, [
      diContainer.resolve(CollisionSystem),
      diContainer.resolve(GestureSystem),
      diContainer.resolve(EcsEventQueueProcessSystem),
      diContainer.resolve(EntityLifeCycleEvalSystem),
      diContainer.resolve(EcsEventQueueCleaningSystem),
    ])

    scope.addSystemAfter(SystemTypeEnum.FRAME_UPDATE, undefined, [
      diContainer.resolve(UpdateTransformSystem),
      diContainer.resolve(AnimationDurationSystem),
      diContainer.resolve(AnimationDefaultHandleSystem),
      diContainer.resolve(AnimationClearSystem),
      diContainer.resolve(EntityLifeCycleFrameUpdateSystem),
    ])
  }
}