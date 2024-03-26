import { Position } from "greentea-core/common/component/Position";
import { Transformation } from "greentea-core/common/component/Transformation";
import { EntityLifecycleComponent } from "greentea-core/entity/entityLifecycle/EntityLifeCycleComponent";
import { SceneBase } from "greentea-core/scene/SceneBase";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { PixiComponent } from "greentea-pixijs/component/PixiComponent";
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
                pixiCom:new PixiComponent<HitProperty>(),
                lifeCom:new EntityLifecycleComponent()
            }

            coms.pos.x = 100
            coms.pos.y = 100

            coms.pixiCom.property = {hit:false}
            coms.pixiCom.node = {
                displayObj: new PIXI.Graphics(),
                render: (displayObj: PIXI.Graphics, property) => {

                    if (property.hit) {
                        displayObj.clear()
                            .beginFill("black")
                            .drawRect(0, 0, 100, 100)
                            .endFill()
                    } else {
                        displayObj.clear()
                            .beginFill("red")
                            .drawRect(0, 0, 100, 100)
                            .endFill()
                    }
                }
            }

            return Object.values(coms)
        })())
    }

    OnExit(): void {
    }
}

type HitProperty = {
    hit:boolean
}