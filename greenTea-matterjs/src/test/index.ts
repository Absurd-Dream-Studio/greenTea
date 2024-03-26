import "reflect-metadata"
import { Container } from "inversify";
import { ISystemContext } from "greentea-infrastructure/app/ecs/system/ISystemContext";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { AppExecutor } from "./AppExecutor.js";
import { SceneContext } from "greentea-core/scene/SceneContext";
import { TestScene } from "./TestScene.js";
import { TestSetup } from "./TestSetup.js";

const main = async () => {
    const diContainer = new Container();

    TestSetup.diSetup(diContainer, {
        Canvas: document.getElementById("main-layer") as HTMLCanvasElement,
        GestureListeningElement: document.getElementById("main-layer"),
        DomEntityMainContainer: document.getElementById("main-container"),
        collisionMapSize: 100
    })
    TestSetup.setup(diContainer)

    const sysContext = diContainer.get<ISystemContext>(TypeConfiguration.TYPES.ISystemContext)
    const globalScope = sysContext.createScope()

    TestSetup.systemSetup(globalScope, diContainer)

    diContainer.resolve(AppExecutor).Start()
    diContainer.get(SceneContext)
        .ChangeScene(
            diContainer.resolve(TestScene)
        )
}

main()