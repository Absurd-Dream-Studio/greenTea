export function drawRoundRect(canvas:HTMLCanvasElement, x:number, y:number, w:number, h:number, radius:number)
{
  let context = canvas.getContext("2d");
  let r = x + w;
  let b = y + h;
  context.beginPath();
  context.moveTo(x+radius, y);
  context.lineTo(r-radius, y);
  context.quadraticCurveTo(r, y, r, y+radius);
  context.lineTo(r, y+h-radius);
  context.quadraticCurveTo(r, b, r-radius, b);
  context.lineTo(x+radius, b);
  context.quadraticCurveTo(x, b, x, b-radius);
  context.lineTo(x, y+radius);
  context.quadraticCurveTo(x, y, x+radius, y);
  context.closePath()
}