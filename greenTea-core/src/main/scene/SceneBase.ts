import { injectable } from "inversify";

@injectable()
export abstract class SceneBase
{
    abstract OnStart():void
    abstract OnExit():void
}