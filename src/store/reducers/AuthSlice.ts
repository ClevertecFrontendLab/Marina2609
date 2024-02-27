import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthForm } from '../../types';
import { ShowLoader } from './LoaderSlice';
import { push } from 'redux-first-history';
import { RootState } from '../../redux/ConfigureStore';
import { FetchLogin } from '../actions/Actions';

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isAuthenticated:
        !!localStorage.getItem('accessToken') || !!sessionStorage.getItem('accessToken'),
    isLoading: false,
    error: null,
};

export const AuthAsync = createAsyncThunk<void, AuthForm, { rejectValue: string }>(
    'auth/login',
    async (payload, thunkAPI) => {
        try {
            thunkAPI.dispatch(ShowLoader(true));
            const { email, password } = payload;
            const loginPayload = { email, password };
            const { accessToken } = await FetchLogin(loginPayload);

            if (payload.rememberMe) {
                localStorage.setItem('accessToken', accessToken);
            } else {
                sessionStorage.setItem('accessToken', accessToken);
            }

            thunkAPI.dispatch(loginSuccess());
            thunkAPI.dispatch(push('/main'));
        } catch (error: unknown) {
            const regError = error as Error;
            const errorMessage = regError.message || 'An error occurred during login';
            thunkAPI.dispatch(loginFailure(errorMessage));
            thunkAPI.dispatch(push('/result/error-login', { fromServer: true }));

            return thunkAPI.rejectWithValue(errorMessage);
        } finally {
            thunkAPI.dispatch(ShowLoader(false));
        }
    },
);

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.error = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
            localStorage.removeItem('accessToken');
            sessionStorage.removeItem('accessToken');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(AuthAsync.pending, (state) => {
            state.isLoading = true;
        });
    },
});

export const { loginSuccess, loginFailure, logout } = AuthSlice.actions;
export const IsAuthenticated = (state: RootState) => state.authenticated.isAuthenticated;

export default AuthSlice.reducer;
