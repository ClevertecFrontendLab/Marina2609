import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { login } from './reducers/login-reducer';
import { message } from './reducers/message-reducer';
import { recovery } from './reducers/recovery-reducer';
import { reducer } from './reducers/reducer';

const rootReducer = combineReducers({
  login,
  message,
  reducer,
  recovery,
});

export const store = legacy_createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
