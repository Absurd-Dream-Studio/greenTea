import { Container, inject, injectable } from "inversify";
import { TestEntityFactory } from "./TestEntityFactory.js";
import { SceneBase } from "greentea-core/scene/SceneBase";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";

@injectable()
export class GestureTestScene extends SceneBase {
    private ec: IEntityCollection

    private readonly diContainer: Container

    constructor(
        @inject(TypeConfiguration.TYPES.IEntityCollection)
        ec: IEntityCollection,
        @inject(TypeConfiguration.TYPES.DIContainer)
        diContainer: Container
    ) {
        super()
        this.ec = ec
        this.diContainer = diContainer
    }

    OnStart(): void {
        const e1 = this.ec.AddEntity(
            this.diContainer.resolve(TestEntityFactory)
                .setPos((pos) => {
                    pos.x = 500
                    pos.y = 500
                }).getInstance()
        )

        const e2 = this.ec.AddEntity(
            this.diContainer.resolve(TestEntityFactory)
                .setPos((pos) => {
                    pos.x = 700
                    pos.y = 500
                }).getInstance()
        )

        console.log(e1, e2)
    }
    OnExit(): void {
    }
}