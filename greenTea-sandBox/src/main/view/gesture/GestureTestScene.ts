import { Container, inject, injectable } from "inversify";
import { TestEntityFactory } from "./TestEntityFactory.js";
import { SceneBase } from "greentea-core/scene/SceneBase";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { GestureContext } from "greentea-core/gesture/gestureEventGeneration/GestureContext";
import { GestureEventTriggerComponent, GestureEventTriggerEventEnum } from "greentea-core/gesture/gestureEventTrigger/GestureEventTriggerComponent";

@injectable()
export class GestureTestScene extends SceneBase {
    private ec: IEntityCollection
    private gestureContext: GestureContext
    private readonly closeActions: Array<() => void> = []

    private readonly diContainer: Container

    constructor(
        @inject(TypeConfiguration.TYPES.IEntityCollection)
        ec: IEntityCollection,
        @inject(TypeConfiguration.TYPES.DIContainer)
        diContainer: Container,
        gestureContext: GestureContext
    ) {
        super()
        this.ec = ec
        this.diContainer = diContainer
        this.gestureContext = gestureContext
    }

    OnStart(): void {

        {
            const el = document.createElement('div')

            el.style.position = 'absolute'
            el.style.top = '400px'
            el.style.left = '400px'
            el.style.width = '100px'
            el.style.height = '100px'
            el.style.backgroundColor = 'black'

            document.body.appendChild(el)
        }

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

        {
            const el = this.gestureContext.backgroundEventListener
            const ls = [
                el.addListener(GestureEventTriggerEventEnum.ON_CLICK, (e) => {
                    console.log('Background Click', e)
                }),
                el.addListener(GestureEventTriggerEventEnum.ON_MOVE, (e) => {
                    console.log('Background Move', e)
                }),
                el.addListener(GestureEventTriggerEventEnum.ON_POINTER_UP, (e) => {
                    console.log('Background Pointer Up', e)
                }),
                el.addListener(GestureEventTriggerEventEnum.ON_POINTER_CANCEL, (e) => {
                    console.log('Background Pointer Cancel', e)
                })
            ]
            this.closeActions.push(() => {
                ls.forEach((l) => el.removeListener(l))
            })
        }

        console.log(e1, e2)
    }
    OnExit(): void {
        this.closeActions.forEach((a) => a())
    }
}