export type CommonResp<RespT> =
{
  code:number;
  message:string;
  data:RespT;
}

export enum CommonRespCodeEnum{
  succ = 0,
  fail = 1
}