import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { inject, injectable } from "inversify";
import * as Pixi from "pixi.js"

/*
this class store all the things that pixi have
*/

@injectable()
export class PixiContext
{
    public mainContainer:Pixi.Container
    public app: Pixi.Application
}