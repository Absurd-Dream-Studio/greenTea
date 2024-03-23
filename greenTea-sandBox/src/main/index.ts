import "reflect-metadata"
import VConsole from "vconsole";
import { AppBuilder } from "@Src/main/app/appBuilder/AppBuilder.js"
import { AppExecutor } from "./app/appBuilder/appExecutor/AppExecutor.js";
import { SceneContext } from "greentea-core/scene/SceneContext";
import { PixiContext } from "greentea-pixijs/PixiContext";
import { EcsEvent } from "greentea-core/ecsEvent/context/EcsEvent";
import { ScreenResizeEvent } from "./infra/event/ScreenResizeEvent.js";
import { GestureTestScene } from "./view/gesture/GestureTestScene.js";

let mainCanvas: HTMLCanvasElement = document.getElementById('main-layer') as HTMLCanvasElement
let vconsole = new VConsole()

mainCanvas.width = mainCanvas.getBoundingClientRect().width
mainCanvas.height = mainCanvas.getBoundingClientRect().height


// prevent screen scrolling 
// document.addEventListener('touchmove', function(e) { e.preventDefault(); }, { passive:false })

let appBuilder = new AppBuilder()
await appBuilder.Build()
let appBuildResult = appBuilder.GetResult()

let diContainer = appBuildResult.diContainer

diContainer.resolve(AppExecutor).Start()

diContainer.get(SceneContext)
    .ChangeScene(
        diContainer.resolve(GestureTestScene)
    )
new ResizeObserver(() => {
    let pixiContext = diContainer.get(PixiContext) as PixiContext
    let ecsEvent = diContainer.get(EcsEvent)

    mainCanvas.width = mainCanvas.getBoundingClientRect().width
    mainCanvas.height = mainCanvas.getBoundingClientRect().height
    pixiContext.app.screen.width = mainCanvas.width
    pixiContext.app.screen.height = mainCanvas.height
    ecsEvent.pushEvent(ScreenResizeEvent.eventType, new ScreenResizeEvent())
}).observe(mainCanvas)