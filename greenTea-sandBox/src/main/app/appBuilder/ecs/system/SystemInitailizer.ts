import { Container } from "inversify";
import { SystemContext, SystemType } from "greentea-infrastructure/app/ecs/system/SystemContext";
import { AnimationClearSystem } from "greentea-core/animation/systems/AnimationClearSystem";
import { AnimationDefaultHandleSystem } from "greentea-core/animation/systems/AnimationDefaultHandleSystem";
import { CollisionSystem } from "greentea-core/collision/system/CollisionSystem";
import { EcsEventDiscreteEventCleaningSystem } from "greentea-core/ecsEvent/systems/EcsEventDiscreteEventCleaningSystem";
import { EcsEventQueueProcessSystem } from "greentea-core/ecsEvent/systems/EcsEventQueueProcessSystem";
import { OneTimeEventHandleSystem } from "greentea-core/ecsEvent/systems/OneTimeEventHandleSystem";
import { EntityLifeCycleEvalSystem } from "greentea-core/entity/entityLifecycle/EntityLifeCycleEvalSystem";
import { GestureSystem } from "greentea-core/gesture/gestureEventGeneration/system/GestureSystem";
import { SceneSystem } from "greentea-core/scene/SceneSystem";
import { UpdateTransformSystem } from "greentea-core/common/system/UpdateTransformSystem";
import { PixiComponentValueMappingSystem } from "greentea-pixijs/ecs/PixiComponentValueMappingSystem";
import { PixiEntityFrameUpdateSystem } from "greentea-pixijs/ecs/PixiEntityFrameUpdateSystem";
import { PixiRenderUpdateSystem } from "greentea-pixijs/ecs/PixiRenderUpdateSystem";
import { ISystemContext } from "greentea-infrastructure/app/ecs/system/ISystemContext";
import TypeConfiguration from "../../dependencyInject/TypeConfiguration.js";
import { PixiColliderRenderSystem } from "greentea-pixijs/ecs/PixiColliderRenderSystem"

export default {
    Init(diContainer: Container) {
        let ctx = diContainer.get<ISystemContext>(TypeConfiguration.Infrastructure.ISystemContext)

        ctx.addSystemAfter(SystemType.FIXED_UPDATE, undefined, [
            diContainer.resolve(CollisionSystem),
            diContainer.resolve(GestureSystem),
            diContainer.resolve(EcsEventQueueProcessSystem),
            diContainer.resolve(EntityLifeCycleEvalSystem),
            // diContainer.resolve(GestureEventTriggerSystem),
            // diContainer.resolve(RenderChestDirectionSystem).Register(),
            diContainer.resolve(AnimationDefaultHandleSystem),
            diContainer.resolve(SceneSystem).setSystemType(SystemType.FIXED_UPDATE),
            diContainer.resolve(OneTimeEventHandleSystem),
            diContainer.resolve(EcsEventDiscreteEventCleaningSystem),
            diContainer.resolve(AnimationClearSystem)
        ])

        ctx.addSystemAfter(SystemType.FRAME_UPDATE, undefined, [
            // diContainer.resolve(ClearCanvasSystem),
            diContainer.resolve(UpdateTransformSystem),
            diContainer.resolve(PixiComponentValueMappingSystem),
            diContainer.resolve(PixiEntityFrameUpdateSystem),
            diContainer.resolve(SceneSystem).setSystemType(SystemType.FRAME_UPDATE),
            diContainer.resolve(PixiRenderUpdateSystem),
            // diContainer.resolve(PixiColliderRenderSystem),
            // diContainer.resolve(CanvasRenderSystem),
            // diContainer.resolve(ColliderRenderSystem),
        ])
    }
}