
import { EventBase, EventType } from "greentea-core/ecsEvent/context/EcsEvent";
export class ScreenResizeEvent extends EventBase
{

  public static eventType:EventType = EventType.ONE_TIME

  constructor()
  {
    super()
  }
}