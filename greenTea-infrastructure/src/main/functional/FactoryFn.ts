export function FactoryFn<T>(cb:()=>T)
{
    return cb()
}