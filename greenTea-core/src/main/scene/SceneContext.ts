import { Runnable } from "greentea-infrastructure/lang/Runnable";
import { injectable } from "inversify";
import { SceneBase } from "./SceneBase.js";
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig";

@injectable()
export class SceneContext {
    private currentScene: SceneBase

    constructor() {
    }

    ChangeScene(scene: SceneBase) {
        if (this.currentScene) {
            this.currentScene.OnExit()
        }

        this.currentScene = scene
        this.currentScene.OnStart()
    }

    GetCurrentScene(): SceneBase {
        return this.currentScene
    }
}