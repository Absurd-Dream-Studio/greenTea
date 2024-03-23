import { Runnable } from "greentea-infrastructure/lang/Runnable";
import { inject, injectable } from "inversify";
import { ISystemContext } from "greentea-infrastructure/app/ecs/system/ISystemContext";
import { SystemTypeEnum } from "greentea-infrastructure/app/ecs/system/SystemTypeEnum";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { PixiContext } from "@Src/PixiContext.js";

@injectable()
export class AppExecutor {

  private lastFixUpdateRunTime:number
  private fixedUpdatetimer: NodeJS.Timer
  private systemStartRunTime: number
  private totalStartRunTime: number
  private pixiContext:PixiContext
  private sysContext:ISystemContext

  constructor(
    @inject(TypeConfiguration.TYPES.ISystemContext)
    sysContext:ISystemContext,
    pixiContext:PixiContext
  ) {
    this.sysContext = sysContext
    this.pixiContext = pixiContext
  }

  Start() {
    this.lastFixUpdateRunTime = Date.now()
    this.fixedUpdatetimer = setInterval(() => {
      this.runFixedUpdateSystem()
      this.lastFixUpdateRunTime = Date.now()
    }, 20)

    this.pixiContext.app.ticker.add((delta) => {
      this.runFrameUpdateSystem()
    })
  }

  private runFixedUpdateSystem(): void {
    this.totalStartRunTime = Date.now()
    let configs = this.sysContext.getSystems(SystemTypeEnum.FIXED_UPDATE)
    for (let system of configs) {
      this.systemStartRunTime = Date.now()
      try {
        system.onUpdate(Date.now() - this.lastFixUpdateRunTime)
      } catch (err) {
        console.error(err)
      }

      this.systemStartRunTime = Date.now() - this.systemStartRunTime
      if (this.systemStartRunTime > 5) {
        console.warn(`system running too slow , systemName : ${(system as Object).constructor.name} , time : ${this.systemStartRunTime}`)
      }
    }

    this.totalStartRunTime = Date.now() - this.totalStartRunTime
    if (this.totalStartRunTime > 10) {
      console.warn(`system run more then 10ms , ${this.totalStartRunTime}`)
    }
  }

  private runFrameUpdateSystem(): void {
    let configs = this.sysContext.getSystems(SystemTypeEnum.FRAME_UPDATE)
    for (let system of configs) {
      system.onUpdate(this.pixiContext.app.ticker.deltaMS)
    }
  }
}