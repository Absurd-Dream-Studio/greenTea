import "reflect-metadata"
import { Container } from "inversify";
import {CoreDefaultSetup} from "greentea-core/app/CoreDefaultSetup"
import { ISystemConstructor } from "pixi.js";
import { ISystemContext } from "greentea-infrastructure/app/ecs/system/ISystemContext";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { PixiSetup } from "@Src/app/PixiSetup.js";
import { AppExecutor } from "./AppExecutor.js";
import { SceneContext } from "greentea-core/scene/SceneContext";
import { TestScene } from "./TestScene.js";

const main = async () => {
    const diContainer = new Container();
    CoreDefaultSetup.diSetup(diContainer, {
        Canvas: document.getElementById("main-layer") as HTMLCanvasElement,
        GestureListeningElement: document.getElementById("main-layer"),
        DomEntityMainContainer: document.getElementById("main-container"),
        collisionMapSize: 100
    })
    PixiSetup.diSetup(diContainer)

    CoreDefaultSetup.setup(diContainer)

    const sysContext = diContainer.get<ISystemContext>(TypeConfiguration.TYPES.ISystemContext)
    const globalScope = sysContext.createScope()
    CoreDefaultSetup.systemSetup(globalScope, diContainer)
    PixiSetup.systemSetup(globalScope, diContainer)
    PixiSetup.setup(diContainer,{})

    diContainer.resolve(AppExecutor).Start()
    diContainer.get(SceneContext)
    .ChangeScene(
        diContainer.resolve(TestScene)
    )
}

main()