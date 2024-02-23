import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import AuthSlice from '../store/reducers/AuthSlice';
import ConfirmEmailSlice from '../store/reducers/ConfirmEmailSlice';
import EmailSlice from '../store/reducers/EmailSlice';
import LoaderSlice from '../store/reducers/LoaderSlice';
import RegistSlice from '../store/reducers/RegistSlice';
import ChangePasswordSlice from '../store/reducers/ChangePasswordSlice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        loader: LoaderSlice,
        email: EmailSlice,
        authenticated: AuthSlice,
        registration: RegistSlice,
        confirmEmail: ConfirmEmailSlice,
        changePassword: ChangePasswordSlice,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const history = createReduxHistory(store);
