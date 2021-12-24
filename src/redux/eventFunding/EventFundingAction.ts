import { EventFundingInfo } from "../../types/eventFunding";

export enum EventFundingAction {
  EDIT_CURRENT_EVENT_FUNDING = 'EDIT_CURRENT_EVENT_FUNDING',
  EDIT_CURRENT_LIST_EVENT_FUNDING = 'EDIT_CURRENT_LIST_EVENT_FUNDING',
}

export interface EventFundingGeneralAction<T> {
  type: EventFundingAction;
  payload: T;
}

export const setCurrentEventFunding = (
  EventFunding: EventFundingInfo,
): EventFundingGeneralAction<EventFundingInfo> => {
  return { type: EventFundingAction.EDIT_CURRENT_EVENT_FUNDING, payload: EventFunding };
};

// export const setCurrentListEventFunding = (
//   families: EventFundingInfo[],
// ): EventFundingGeneralAction<EventFundingInfo[]> => {
//   return { type: EventFundingAction.EDIT_CURRENT_LIST_EventFunding, payload: families };
// };
