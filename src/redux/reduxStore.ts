import { createStore, combineReducers, compose } from 'redux';
import FamilyReducer, { FamilyReduxState } from './family/FamilyReducer';
import {
  PageRenderingReducer,
  PageRenderingReduxState,
} from './pageRendering/PageRenderingReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import EventFundingReducer, {
  EventFundingReduxState,
} from './eventFunding/EventFundingReducer';
import ErrorSearchReducer, {
  ErrorSearchReduxState,
} from './errorSearch/ErrorSearchReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface RootState {
  family: FamilyReduxState;
  pageRendering: PageRenderingReduxState;
  eventFunding: EventFundingReduxState;
  errorSearch: ErrorSearchReduxState;
}

const rootReducer = combineReducers({
  family: FamilyReducer,
  pageRendering: PageRenderingReducer,
  eventFunding: EventFundingReducer,
  errorSearch: ErrorSearchReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
