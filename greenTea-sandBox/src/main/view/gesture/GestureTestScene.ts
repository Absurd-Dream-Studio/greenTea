import { Container, inject, injectable } from "inversify";
import { TestEntityFactory } from "./TestEntityFactory.js";
import { SceneBase } from "greentea-core/scene/SceneBase";
import { IEntityCollection } from "greentea-infrastructure/ecs/collection/IEntityCollection";
import TypeConfiguration from "@Src/main/app/appBuilder/dependencyInject/TypeConfiguration.js";

@injectable()
export class GestureTestScene extends SceneBase {
    private ec: IEntityCollection

    private readonly diContainer: Container

    constructor(
        @inject(TypeConfiguration.Infrastructure.IEntityCollection)
        ec: IEntityCollection,
        @inject(TypeConfiguration.Infrastructure.DIContainer)
        diContainer: Container
    ) {
        super()
        this.ec = ec
        this.diContainer = diContainer
    }

    OnStart(): void {
        this.ec.AddEntity(
            this.diContainer.resolve(TestEntityFactory)
                .setPos((pos) => {
                    pos.x = 500
                    pos.y = 500
                }).getInstance()
        )

        this.ec.AddEntity(
            this.diContainer.resolve(TestEntityFactory)
                .setPos((pos) => {
                    pos.x = 700
                    pos.y = 500
                }).getInstance()
        )
    }
    OnExit(): void {
    }
}