import { MatterJsCollisionSetSystem } from "@Src/MatterJsCollisionSetSystem.js";
import { MatterJsMapChildTranSystem } from "@Src/MatterJsMapChildTranSystem.js";
import { MatterJsRunnerSystem } from "@Src/MatterJsRunnerSystem.js";
import { MatterJsSetup } from "@Src/MatterJsSetup.js";
import { AnimationClearSystem } from "greentea-core/animation/systems/AnimationClearSystem";
import { AnimationDefaultHandleSystem } from "greentea-core/animation/systems/AnimationDefaultHandleSystem";
import { AnimationDurationSystem } from "greentea-core/animation/systems/AnimationDurationSystem";
import { CoreDefaultSetup } from "greentea-core/app/CoreDefaultSetup";
import { UpdateTransformSystem } from "greentea-core/common/system/UpdateTransformSystem";
import { EcsEventQueueCleaningSystem } from "greentea-core/ecsEvent/systems/EcsEventQueueCleaningSystem";
import { EcsEventQueueProcessSystem } from "greentea-core/ecsEvent/systems/EcsEventQueueProcessSystem";
import { EntityLifeCycleEvalSystem } from "greentea-core/entity/entityLifecycle/EntityLifeCycleEvalSystem";
import { EntityLifeCycleFrameUpdateSystem } from "greentea-core/entity/entityLifecycle/EntityLifeCycleFrameUpdateSystem";
import { GestureSystem } from "greentea-core/gesture/gestureEventGeneration/system/GestureSystem";
import { ISystemScope } from "greentea-infrastructure/app/ecs/system/ISystemScope";
import { SystemTypeEnum } from "greentea-infrastructure/app/ecs/system/SystemTypeEnum";
import { PixiSetup } from "greentea-pixijs/app/PixiSetup";
import { Container } from "inversify";

export const TestSetup = {
    diSetup(diContainer: Container,
        config: {
            Canvas: HTMLCanvasElement,
            GestureListeningElement: HTMLElement,
            DomEntityMainContainer: HTMLElement,
            collisionMapSize: number
        }
    ) {
        CoreDefaultSetup.diSetup(diContainer, config)
        PixiSetup.diSetup(diContainer)
        MatterJsSetup.diSetup(diContainer)
    },
    setup(diContainer: Container) {
        CoreDefaultSetup.setup(diContainer)
        PixiSetup.setup(diContainer, {})
        MatterJsSetup.setup(diContainer)
    },
    systemSetup(scope: ISystemScope, diContainer: Container) {
        scope.addSystemAfter(SystemTypeEnum.FIXED_UPDATE, undefined, [
            //   diContainer.resolve(CollisionSystem),
            diContainer.resolve(MatterJsCollisionSetSystem),
            diContainer.resolve(GestureSystem),
            diContainer.resolve(EcsEventQueueProcessSystem),
            diContainer.resolve(EntityLifeCycleEvalSystem),
            diContainer.resolve(EcsEventQueueCleaningSystem),
        ])

        scope.addSystemAfter(SystemTypeEnum.FRAME_UPDATE, undefined, [
            diContainer.resolve(UpdateTransformSystem),
            diContainer.resolve(MatterJsMapChildTranSystem),
            diContainer.resolve(AnimationDurationSystem),
            diContainer.resolve(AnimationDefaultHandleSystem),
            diContainer.resolve(AnimationClearSystem),
            diContainer.resolve(EntityLifeCycleFrameUpdateSystem),
            diContainer.resolve(MatterJsRunnerSystem),
        ])

        PixiSetup.systemSetup(scope, diContainer)
    }
}