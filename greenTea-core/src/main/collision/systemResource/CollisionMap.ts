import { Entity } from "greentea-infrastructure/ecs/entity/Entity";
import { Bounding } from "greentea-infrastructure/geometry/types/Bounding";


export class CollisionMap
{
    private chunkMap:Map<string,Array<Entity>>
    private readonly chunkSize:number

    private tempChunkId:string

    constructor(
        chunkSize:number
    )
    {
        this.chunkMap = new Map()
        this.chunkSize = chunkSize
    }

    getChunkMap():Map<string,Array<Entity>>
    {
        return this.chunkMap
    }

    addToMap(
        bounding:Bounding,
        entity:Entity
    ):string[]
    {
        //console.log(bounding)
        let chunkIds = this.getChunkId(bounding.top,bounding.bottom,bounding.left,bounding.right)

        for(this.tempChunkId of chunkIds)
        {
            let chunk = this.chunkMap.get(this.tempChunkId)
            if(chunk === null || chunk === undefined)
            {
                chunk = new Array<Entity>()
                this.chunkMap.set(this.tempChunkId , chunk)
            }
            chunk.push(entity)
        }

        return chunkIds
    }

    getChunkId(top:number,bottom:number,left:number,right:number):string[]
    {
        let boundTop:number = top / this.chunkSize
        let boundBottom:number = bottom / this.chunkSize
        let boundLeft:number = left / this.chunkSize
        let boundRight:number = right / this.chunkSize

        boundTop = Math.floor(boundTop)
        boundBottom = Math.floor(boundBottom)
        boundLeft = Math.floor(boundLeft)
        boundRight = Math.floor(boundRight)

        // console.log(top,bottom,left,right)
        // (boundBottom - boundTop) * (boundRight - boundLeft)
        let ret = new Array<string>()

        for(let i = boundLeft ; i < boundRight + 1 ; i ++)
        {
            for(let j = boundTop ; j < boundBottom + 1 ; j++)
            {
                ret.push(i + ',' + j)
            }
        }
        return ret
    }
}