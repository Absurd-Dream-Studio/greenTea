import { PixiComponent } from "@Src/component/PixiComponent.js";
import { Position } from "greentea-core/common/component/Position";
import { Transformation } from "greentea-core/common/component/Transformation";
import { SceneBase } from "greentea-core/scene/SceneBase";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { inject, injectable } from "inversify";
import * as PIXI from "pixi.js"

@injectable()
export class TestScene extends SceneBase
{
    private ec: IEntityCollection

    constructor(
        @inject(TypeConfiguration.TYPES.IEntityCollection)
        ec:IEntityCollection
    )
    {
        super()
        this.ec = ec
    }


    OnStart(): void {

        console.debug("add entity")

        this.ec.AddEntity((()=>{
            const coms = {
                pos:new Position(),
                tran:new Transformation(),
                pixiCom:new PixiComponent()
            }

            coms.pos.x = 100
            coms.pos.y = 100

            coms.pixiCom.property = {}
            coms.pixiCom.node = {
                displayObj: new PIXI.Graphics(),
                render: (displayObj: PIXI.Graphics, property) => {
                    console.debug(coms.pos.screenX, coms.pos.screenY)
                    displayObj.clear()
                        .beginFill("black")
                        .drawRect(0, 0, 100, 100)
                        .endFill()
                }
            }

            return Object.values(coms)
        })())
    }

    OnExit(): void {
    }
}