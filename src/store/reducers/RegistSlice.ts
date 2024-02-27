import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { push } from 'redux-first-history';
import { RootState } from '../../redux/ConfigureStore';
import { RegistValues } from '../../types';
import { ShowLoader } from './LoaderSlice';
import { Error, FetchRegistration } from '../actions/Actions';

interface RegistState {
    isLoading: boolean;
    error: Error | null;
}

const initialState: RegistState = {
    isLoading: false,
    error: null,
};

export const RegistAsync = createAsyncThunk<void, RegistValues, { rejectValue: Error }>(
    'auth/register',
    async (payload, thunkAPI) => {
        try {
            thunkAPI.dispatch(ShowLoader(true));
            await FetchRegistration(payload);
            thunkAPI.dispatch(registerSuccess());
            thunkAPI.dispatch(push('/result/success', { fromServer: true }));
        } catch (error: unknown) {
            const registerError = error as Error;
            thunkAPI.dispatch(registerFailure(registerError));
            if (registerError.statusCode === 409) {
                thunkAPI.dispatch(push('/result/error-user-exist', { fromServer: true }));
            } else {
                thunkAPI.dispatch(push('/result/error', { fromServer: true }));
            }
            return thunkAPI.rejectWithValue(registerError);
        } finally {
            thunkAPI.dispatch(ShowLoader(false));
        }
    },
);

const RegistSlice = createSlice({
    name: 'regist',
    initialState,
    reducers: {
        registerSuccess: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        registerFailure: (state, action: PayloadAction<Error>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(RegistAsync.pending, (state) => {
            state.isLoading = true;
        });
    },
});

export const { registerSuccess, registerFailure } = RegistSlice.actions;

export const IsLoading = (state: RootState) => state.registration.isLoading;
export const RegistError = (state: RootState) => state.registration.error;

export default RegistSlice.reducer;
