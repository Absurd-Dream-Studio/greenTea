import { Bernstein } from "greentea-infrastructure/math/CommonMathUtils"
import * as InterpolationUtils from "greentea-infrastructure/math/InterpolationUtils"

export function LinearSpeedFunction(rate:number):number
{
    return rate
}

export function CycleFunction(rate:number):number
{
    if(rate > 0.5)
    {
        return 2 - (rate * 2)
    }else 
    {
        return rate * 2
    }
}

export function BezierFunction(parms: number[]): (rate: number) => number {
    return (rate: number) => {
        let b = 0
        const n = parms.length - 1
        const pw = Math.pow
        const bn = Bernstein

        for (let i = 0; i <= n; i++) {
            b += pw(1 - rate, n - i) * pw(rate, i) * parms[i] * bn(n, i)
        }
        return b
    }
}

export function Pow(v:number):(rate:number)=>number
{
    return (rate:number) =>{
        return Math.pow(rate , v)
    }
}

export function easeOutExpo(x: number): number {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}