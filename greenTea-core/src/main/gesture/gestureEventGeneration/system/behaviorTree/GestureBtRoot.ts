import { BTNodeFactoryType } from "greentea-infrastructure/ai/behaviorTree/types/BTNodeFactoryType";
import { GestureBtContext, GestureProcessStateEnum } from "./GestureBtContext.js";
import FallBack from "greentea-infrastructure/ai/behaviorTree/tags/controlFlow/FallBack";
import Parallel from "greentea-infrastructure/ai/behaviorTree/tags/controlFlow/Parallel";
import Seq from "greentea-infrastructure/ai/behaviorTree/tags/controlFlow/Seq";
import Predicate from "greentea-infrastructure/ai/behaviorTree/tags/execution/Predicate";
import isProcessState from "./condition/isProcessState.js";
import UpdateInPointEntities from "./action/UpdateInPointEntities.js";
import UpdateFocusEntity from "./action/UpdateFocusEntity.js";
import AddToPointerMap from "./action/AddToPointerMap.js";
import EvalOnClickTrigger from "./action/eval/entity/EvalOnClickTrigger.js";
import HaveFocusEntity from "./condition/HaveFocusEntity.js";
import { BTNodeResultEnum } from "greentea-infrastructure/ai/behaviorTree/BTNodeResultEnum";
import Action from "greentea-infrastructure/ai/behaviorTree/tags/execution/Action";
import FocusEntityHaveTriggerCom from "./condition/FocusEntityHaveTriggerCom.js";
import isPointerEventType from "./condition/isPointerEventType.js";
import FocusInEntityNotEqualFocusEntity from "./condition/FocusInEntityNotEqualFocusEntity.js";
import EvalOnFocusInTrigger from "./action/eval/entity/EvalOnFocusInTrigger.js";
import FocusInEntityStillInEc from "./condition/FocusInEntityStillInEc.js";
import EvalOnFocusOutTrigger from "./action/eval/entity/EvalOnFocusOutTrigger.js";
import UpdateLongPressTriggerWhenMoving from "./action/UpdateLongPressTriggerWhenMoving.js";
import EvalOnMoveTrigger from "./action/eval/entity/EvalOnMoveTrigger.js";
import PointerFirstClickEntityEqualToFoucsEntity from "./condition/PointerFirstClickEntityEqualToFoucsEntity.js";
import EvalOnEnterTrigger from "./action/eval/entity/EvalOnEnterTrigger.js";
import Not from "greentea-infrastructure/ai/behaviorTree/tags/execution/Not";
import EvalOnReleaseTrigger from "./action/eval/entity/EvalOnReleaseTrigger.js";
import EvalOnPointerUpTrigger from "./action/eval/entity/EvalOnPointerUpTrigger.js";
import BeforeProcessEventQueueUpdatePointerFlag from "./action/BeforeProcessEventQueueUpdatePointerFlag.js";
import UpdatePointerFlag from "./action/UpdatePointerFlag.js";
import RemovePointerInMap from "./action/RemovePointerInMap.js";
import EvalOnPointerCancelTrigger from "./action/eval/entity/EvalOnPointerCancelTrigger.js";
import EvalOnLongPressTrigger from "./action/eval/entity/EvalOnLongPressTrigger.js";
import PointerIsTracking from "./condition/PointerIsTracking.js";
import EvalBackgroundOnClickEvent from "./action/eval/background/EvalBackgroundOnClickEvent.js";
import EvalBackgroundOnMoveEvent from "./action/eval/background/EvalBackgroundOnMoveEvent.js";
import EvalBackgroundOnPointerUpEvent from "./action/eval/background/EvalBackgroundOnPointerUpEvent.js";
import EvalBackgroundOnPointerCancelEvent from "./action/eval/background/EvalBackgroundOnPointerCancelEvent.js";

export default function (): BTNodeFactoryType<GestureBtContext> {
    return (
        FallBack([
            Seq([
                isProcessState(GestureProcessStateEnum.BEFORE_PROCESS_EVENT_QUEUE),
                BeforeProcessEventQueueUpdatePointerFlag
            ]),
            Seq([
                isProcessState(GestureProcessStateEnum.PROCESS_EVENT_QUEUE),
                UpdateInPointEntities,
                UpdateFocusEntity,
                UpdatePointerFlag,
                FallBack([
                    Seq([
                        isPointerEventType('pointerdown'),
                        AddToPointerMap,
                        FallBack([
                            Seq([
                                Parallel([
                                    Seq([
                                        HaveFocusEntity,
                                        FocusEntityHaveTriggerCom,
                                        EvalOnClickTrigger,
                                        FocusInEntityNotEqualFocusEntity,
                                        EvalOnFocusInTrigger
                                    ]),
                                    Seq([
                                        FocusInEntityNotEqualFocusEntity,
                                        FocusInEntityStillInEc,
                                        EvalOnFocusOutTrigger
                                    ]),
                                    Seq([
                                        Not(HaveFocusEntity),
                                        EvalBackgroundOnClickEvent
                                    ]),
                                    Action(ctx => {
                                        ctx.focusInEntity = ctx.foucsEntity
                                        return BTNodeResultEnum.SUCCESS
                                    })
                                ])
                            ]),
                            Action(ctx => BTNodeResultEnum.SUCCESS)
                        ])
                    ]),
                    Seq([
                        isPointerEventType('pointermove'),
                        FallBack([
                            Seq([
                                PointerIsTracking,
                                Parallel([
                                    UpdateLongPressTriggerWhenMoving(10),
                                    Seq([
                                        HaveFocusEntity,
                                        FocusEntityHaveTriggerCom,
                                        EvalOnMoveTrigger
                                    ]),
                                    Seq([
                                        HaveFocusEntity,
                                        FocusEntityHaveTriggerCom,
                                        Not(PointerFirstClickEntityEqualToFoucsEntity),
                                        EvalOnEnterTrigger
                                    ]),
                                    Seq([
                                        Not(HaveFocusEntity),
                                        EvalBackgroundOnMoveEvent
                                    ])
                                ]),
                            ]),
                            Seq([
                                Not(PointerIsTracking),
                                HaveFocusEntity,
                                FocusEntityHaveTriggerCom,
                                EvalOnEnterTrigger
                            ]),
                            Predicate(ctx => true)
                        ])
                    ]),
                    Seq([
                        isPointerEventType('pointerup'),
                        PointerIsTracking,
                        FallBack([
                            Parallel([
                                Seq([
                                    HaveFocusEntity,
                                    FocusEntityHaveTriggerCom,
                                    PointerFirstClickEntityEqualToFoucsEntity,
                                    EvalOnReleaseTrigger,
                                ]),
                                Seq([
                                    Not(HaveFocusEntity),
                                    EvalBackgroundOnPointerUpEvent
                                ]),
                                EvalOnPointerUpTrigger,
                            ]),
                            Predicate(ctx => true)
                        ]),
                        RemovePointerInMap,
                    ]),
                    Seq([
                        isPointerEventType('pointercancel'),
                        Parallel([
                            Seq([
                                PointerIsTracking,
                                EvalOnPointerCancelTrigger,
                                RemovePointerInMap,
                            ]),
                            Seq([
                                Not(HaveFocusEntity),
                                EvalBackgroundOnPointerCancelEvent
                            ]),
                            Predicate(ctx => true)
                        ])
                    ])
                ]),
            ]),
            Seq([
                isProcessState(GestureProcessStateEnum.AFTER_PROCESS_EVENT_QUEUE),
                EvalOnLongPressTrigger(300)
            ])
        ])
    )
}