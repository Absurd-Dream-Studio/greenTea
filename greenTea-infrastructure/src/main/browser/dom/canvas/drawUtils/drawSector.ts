export function drawSector(
    canvas:HTMLCanvasElement,
    x:number,
    y:number,
    innerR:number,
    outerR:number,
    startRadian:number,
    endRadian:number
)
{
    let context = canvas.getContext('2d')
    context.save()
    context.beginPath()
    context.moveTo(Math.cos(startRadian) * innerR + x , Math.sin(startRadian) * innerR + y)
    context.lineTo(Math.cos(startRadian) * outerR + x , Math.sin(startRadian) * outerR + y)
    context.arc(x,y,outerR,startRadian,endRadian,false)
    context.lineTo(Math.cos(endRadian) * innerR + x , Math.sin(endRadian) * innerR + y)

    if(innerR > 0)
    {
        context.arc(x,y,innerR,endRadian,startRadian,true)
    }
    context.closePath()
    context.restore()
}