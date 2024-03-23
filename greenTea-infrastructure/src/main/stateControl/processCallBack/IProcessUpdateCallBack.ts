export interface IProcessUpdateCallBack<MessageT>{
    (totalJobCount:number,currentJobIndex:number,message:MessageT):void
}