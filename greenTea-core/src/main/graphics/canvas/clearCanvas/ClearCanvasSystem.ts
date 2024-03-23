import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration"
import { ISystem } from "greentea-infrastructure/ecs/system/ISystem"
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig"
import { Runnable } from "greentea-infrastructure/lang/Runnable"
import { inject, injectable } from "inversify"

@injectable()
export class ClearCanvasSystem implements ISystem
{
    canvas:HTMLCanvasElement
    context2D:CanvasRenderingContext2D

    constructor(
        @inject(TypeConfiguration.TYPES.Canvas) canvas:HTMLCanvasElement
    )
    {
        this.canvas = canvas
        this.context2D = this.canvas.getContext("2d")
    }
    Register(): SystemConfig {
        return {
            onUpdate:()=>this.OnUpdate()
        }
        throw new Error("Method not implemented.")
    }

    private OnUpdate(): void
    {
        // this.context2D.fillStyle = 'white'
        this.context2D.clearRect(
            this.canvas.getBoundingClientRect().x,
            this.canvas.getBoundingClientRect().y,
            this.canvas.getBoundingClientRect().width,
            this.canvas.getBoundingClientRect().height
        )
    }
}