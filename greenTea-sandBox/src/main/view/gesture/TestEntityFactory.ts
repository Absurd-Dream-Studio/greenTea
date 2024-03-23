import { BoxCollider } from "greentea-core/collision/component/collider/BoxCollider"
import { ColliderComponent } from "greentea-core/collision/component/collider/ColliderComponent"
import { Position } from "greentea-core/common/component/Position"
import { Transformation } from "greentea-core/common/component/Transformation"
import { GestureEventTriggerComponent, GestureEventTriggerEventEnum } from "greentea-core/gesture/gestureEventTrigger/GestureEventTriggerComponent"
import { FactoryFn } from "greentea-infrastructure/functional/FactoryFn"
import { IFactoryBuilderMethod } from "greentea-infrastructure/functional/IFactoryBuilderMethod"
import { PixiComponent } from "greentea-pixijs/ecs/PixiComponent"
import { EntityLifecycleComponent, EntityLifecycleEventEnum } from "greentea-core/entity/entityLifecycle/EntityLifeCycleComponent"
import  PixiObject  from "greentea-pixijs/tags/PixiObject"
import * as PIXI from "pixi.js"
import { Container, inject, injectable } from "inversify"
import TypeConfiguration from "@Src/main/app/appBuilder/dependencyInject/TypeConfiguration.js"
import { EcsEvent } from "greentea-core/ecsEvent/context/EcsEvent"

@injectable()
export class TestEntityFactory {

    private readonly diContainer:Container

    private readonly pos:Position
    private readonly tran:Transformation
    private readonly collider:ColliderComponent
    private readonly render:PixiComponent
    private readonly trigger:GestureEventTriggerComponent
    private readonly lifeCom:EntityLifecycleComponent

    constructor(
        @inject(TypeConfiguration.Infrastructure.DIContainer)
        diContainer:Container
    )
    {
        this.pos = new Position()
        this.tran = new Transformation()
        this.collider = new ColliderComponent()
        this.render = new PixiComponent()
        this.trigger = new GestureEventTriggerComponent()
        this.lifeCom = new EntityLifecycleComponent()

        this.diContainer = diContainer
    }

    setPos(cb:IFactoryBuilderMethod<Position>):TestEntityFactory
    {
        cb(this.pos)
        return this
    }

    getInstance():Object[]
    {
        let w = 100
        let h = 100
        let dx = -50
        let dy = -50
        this.collider.collider = FactoryFn(()=>{
            let ret = new BoxCollider()
            ret.dx = dx
            ret.dy = dy
            ret.w = w
            ret.h = h
            return ret
        })

        this.render.root = PixiObject({
            obj: FactoryFn(() => {
                let ret = new PIXI.Graphics()
                ret.beginFill('red')
                .drawRect(dx, dy, w, h)
                .endFill()
                return ret
            })
        }).getNode()

        this.diContainer.resolve(Behavior)
        .Register({
            trigger: this.trigger,
            lifeCom:this.lifeCom
        })
        return[
            this.lifeCom,
            this.pos,
            this.tran,
            this.collider,
            this.render,
            this.trigger
        ]
    }
}

@injectable()
class Behavior
{
    private ecsEvent:EcsEvent

    constructor(
        ecsEvent:EcsEvent
    )
    {
        this.ecsEvent = ecsEvent
    }


    Register(config:{
        trigger:GestureEventTriggerComponent,
        lifeCom:EntityLifecycleComponent
    })
    {
        {
        let el = config.trigger.eventListener

        el.addListener(GestureEventTriggerEventEnum.ON_CLICK , (v)=>{
            console.debug('click' , v)
        })

        el.addListener(GestureEventTriggerEventEnum.ON_MOVE , (v)=>{
            console.debug('down' , v)
        }
        )

        el.addListener(GestureEventTriggerEventEnum.ON_ENTER , (v)=>{
            console.debug('dragin' , v)
        }
        )

        el.addListener(GestureEventTriggerEventEnum.ON_FOCUS_IN , (v)=>{
            console.debug('focus in' , v)
        })

        el.addListener(GestureEventTriggerEventEnum.ON_FOCUS_OUT , (v)=>{
            console.debug('focus out' , v)
        })

        el.addListener(GestureEventTriggerEventEnum.ON_LONG_PRESS , (v)=>{
            console.debug('long press' , v)
        })

        el.addListener(GestureEventTriggerEventEnum.ON_POINTER_UP , (v)=>{
            console.debug('pointer up' , v)
        })

        el.addListener(GestureEventTriggerEventEnum.ON_POINTER_CANCEL , (v)=>{
            console.debug('pointer cancel' , v)
        })

        el.addListener(GestureEventTriggerEventEnum.ON_RELEASE , (v)=>{
            console.debug('release' , v)
        })
        }
    }
}