import * as BTExecutor from "greentea-infrastructure/ai/behaviorTree/BTExecutor"
import * as Collections from "typescript-collections"
import { CollisionMap } from "@Src/collision/systemResource/CollisionMap.js";
import { Runnable } from "greentea-infrastructure/lang/Runnable";
import { EcsEvent } from "@Src/ecsEvent/context/EcsEvent.js";
import { inject, injectable } from "inversify";
import TypeConfiguration from "greentea-infrastructure/dependencyInject/TypeConfiguration";
import { GestureBtContext, GestureProcessStateEnum } from "./behaviorTree/GestureBtContext.js";
import { IEntityCollection } from "greentea-infrastructure/ecs/entity/IEntityCollection";
import { ISystem } from "greentea-infrastructure/ecs/system/ISystem";
import { SystemConfig } from "greentea-infrastructure/ecs/system/types/SystemConfig";
import { PointerEventType } from "./PointerEventType.js";
import { GestureContext } from "../GestureContext.js";
import { GestureUtils } from "@Src/gesture/GestureUtils.js";
import GestureBtRoot from "./behaviorTree/GestureBtRoot.js";


@injectable()
export class GestureSystem implements ISystem {
    private listeningElement: HTMLElement
    private ec: IEntityCollection
    private ecsEvent: EcsEvent
    private collisionMap: CollisionMap
    private pointerEventQueue: Collections.Queue<PointerEventType>
    private btContext: GestureBtContext
    private context:GestureContext

    constructor(
        @inject(TypeConfiguration.TYPES.IEntityCollection) ec: IEntityCollection,
        ecsEvent: EcsEvent,
        collisionMap: CollisionMap,
        @inject(TypeConfiguration.TYPES.GestureListeningElement) listeningElement: HTMLElement,
        context:GestureContext
    ) {
        this.ec = ec
        this.ecsEvent = ecsEvent
        this.pointerEventQueue = new Collections.Queue()
        this.collisionMap = collisionMap
        this.context = context

        this.btContext = new GestureBtContext()
        this.btContext.ec = this.ec
        this.btContext.collisionMap = this.collisionMap
        this.btContext.root = GestureBtRoot().getNode()
        this.btContext.gestureContext = this.context

        this.listeningElement = listeningElement

        this.listeningElement.addEventListener('pointerdown', (ev) => {
            // console.log('pointerdown' , ev.clientX , ev.clientY , ev.pointerId)

            this.listeningElement.setPointerCapture(ev.pointerId)

            this.pointerEventQueue.add({
                type: "pointerdown",
                pointerId: ev.pointerId,
                clientX: ev.offsetX,
                clientY: ev.offsetY,
                worldX:-1,
                worldY:-1
            })
        })

        this.listeningElement.addEventListener('pointermove', (ev) => {
            // console.log('move' , ev.clientX , ev.clientY , ev.pointerId)
            this.pointerEventQueue.add({
                type: "pointermove",
                pointerId: ev.pointerId,
                clientX: ev.offsetX,
                clientY: ev.offsetY,
                worldX:-1,
                worldY:-1
            })
        })

        this.listeningElement.addEventListener('pointerup', (ev) => {
            // console.log('pointerup' , ev.clientX , ev.clientY , ev.pointerId)
            this.pointerEventQueue.add({
                type: "pointerup",
                pointerId: ev.pointerId,
                clientX: ev.offsetX,
                clientY: ev.offsetY,
                worldX:-1,
                worldY:-1
            })
        })

        this.listeningElement.addEventListener('pointercancel',(ev)=>{
            this.pointerEventQueue.add({
                type: "pointercancel",
                pointerId: ev.pointerId,
                clientX: ev.clientX,
                clientY: ev.clientY,
                worldX:-1,
                worldY:-1
            })
        })
    }
    Register(): SystemConfig {
        return {
            onUpdate: () => this.OnUpdate()
        }
    }

    private OnUpdate(): void {
        this.btContext.processState = GestureProcessStateEnum.BEFORE_PROCESS_EVENT_QUEUE
        BTExecutor.execute(this.btContext, this.btContext.root)

        this.btContext.processState = GestureProcessStateEnum.PROCESS_EVENT_QUEUE
        while (!this.pointerEventQueue.isEmpty()) {
            let pointerEvent = this.pointerEventQueue.dequeue()

            let worldXy = GestureUtils.ToWorldXy(this.context, pointerEvent.clientX, pointerEvent.clientY)
            pointerEvent.worldX = worldXy.x
            pointerEvent.worldY = worldXy.y
            this.btContext.pointEvent = pointerEvent
            BTExecutor.execute(this.btContext, this.btContext.root)
        }

        this.btContext.processState = GestureProcessStateEnum.AFTER_PROCESS_EVENT_QUEUE
        this.btContext.pointEvent = undefined
        BTExecutor.execute(this.btContext, this.btContext.root)

    }
}