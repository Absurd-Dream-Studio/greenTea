export type CommonProcessUpdateResp<DataT> = {
    status:CommonProcessUpdateStatusEnum,
    data:DataT,
    message:string
}

export enum CommonProcessUpdateStatusEnum{
    succ,
    fail,
    pending
}