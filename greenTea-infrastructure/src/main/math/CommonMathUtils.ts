export function Clamp(
    min:number,
    max:number,
    value:number
):number
{
    if(value > max)
    {
        return max
    }else if(value < min)
    {
        return min
    }

    return Math.min(Math.max(value, min), max);
}

export function GetRate(
    min:number,
    max:number,
    value:number
):number
{
    return (value - min) / (max - min)
}

/**
 * polar to corrdinate
 * @param angle in radians
 * @param magnitude
 * @param point [0] x, [1] y
 * @returns [0] x, [1] y
 */
export function PolarToCartesian(
    angle:number,
    magnitude:number,
    point:number[]
):number[]
{
    let x = magnitude * Math.cos(angle) + point[0]
    let y = magnitude * Math.sin(angle) + point[1]
    return [x, y]
}

export function Bernstein(n: number, i: number): number {
    const fc = Factorial

    return fc(n) / fc(i) / fc(n - i)
}

export const Factorial = (function () {
    // this is cache for factorial
    const a = [1]
    return function (n: number): number {
        let s = 1

        if (a[n]) {
            return a[n]
        }

        for (let i = n; i > 1; i--) {
            s *= i
        }

        a[n] = s
        return s
    }
})()

export function getDistance(
    x1:number,
    y1:number,
    x2:number,
    y2:number
):number
{
    let dx = x1 - x2
    let dy = y1 - y2

    return Math.sqrt((dx * dx) + (dy * dy))
}