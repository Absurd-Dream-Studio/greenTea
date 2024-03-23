export function drawTriangle(
    canvas:HTMLCanvasElement,
    x:number,
    y:number,
    w:number,
    h:number,
    angle:number
)
{
    var context = canvas.getContext('2d')

    context.save()
    context.beginPath();
    
    
    context.translate(x,y);
    context.rotate(angle * Math.PI / 180)
    
    context.moveTo(0 , -h/2)
    context.lineTo(w/2,h/2)
    context.lineTo(-w/2,h/2)
    
    context.closePath()
    context.restore()
    // context.rotate(angle * Math.PI / 180)
}