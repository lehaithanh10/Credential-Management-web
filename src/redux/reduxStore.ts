import { createStore, combineReducers, compose } from 'redux';
import FamilyReducer, { FamilyReduxState } from './family/FamilyReducer';
import {
  PageRenderingReducer,
  PageRenderingReduxState,
} from './pageRendering/PageRenderingReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface RootState {
  family: FamilyReduxState;
  pageRendering: PageRenderingReduxState;
}

const rootReducer = combineReducers({
  family: FamilyReducer,
  pageRendering: PageRenderingReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
