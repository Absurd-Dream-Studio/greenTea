export function rgbaToColorString(
    rgba:number[]
):string
{
    return `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`
}

export function rgbaStringTorgbaNumberArray(val:string):number[]
{
    let rgb = val.slice(
        val.indexOf("(") + 1, 
        val.indexOf(")")
    )
    .replace(' ' , '')
    .split(",");


    return [
        parseFloat(rgb[0]),
        parseFloat(rgb[1]),
        parseFloat(rgb[2]),
        parseFloat(rgb[3])
    ]
}