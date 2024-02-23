import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { push } from 'redux-first-history';
import { Confirm } from '../../types';
import { ShowLoader } from './LoaderSlice';
import { FetchConfirmEmail } from '../actions/Actions';
import { RootState } from '../../redux/ConfigureStore';

interface ConfirmEmailState {
    isLoading: boolean;
    email: string;
    code: string;
    error: Error | null;
}

const initialState: ConfirmEmailState = {
    isLoading: false,
    email: '',
    code: '',
    error: null,
};

export const ConfirmEmailAsync = createAsyncThunk<void, Confirm, { rejectValue: Error }>(
    'auth/confirmEmail',
    async (payload, thunkAPI) => {
        try {
            thunkAPI.dispatch(ShowLoader(true));
            await FetchConfirmEmail(payload);
            thunkAPI.dispatch(confirmEmailSuccess(payload));
            thunkAPI.dispatch(push('/auth/change-password', { fromServer: true }));
        } catch (error: unknown) {
            const confirmEmailError = error as Error;
            return thunkAPI.rejectWithValue(confirmEmailError);
        } finally {
            thunkAPI.dispatch(ShowLoader(false));
        }
    },
);

const ConfirmEmailSlice = createSlice({
    name: 'confirmEmail',
    initialState,
    reducers: {
        confirmEmailSuccess: (state, action: PayloadAction<Confirm>) => {
            state.isLoading = false;
            state.error = null;
            state.email = action.payload.email;
            state.code = action.payload.code;
        },
        confirmEmailFailure: (state, action: PayloadAction<Error>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(ConfirmEmailAsync.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(ConfirmEmailAsync.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(ConfirmEmailAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as Error;
        });
    },
});

export const { confirmEmailSuccess, confirmEmailFailure } = ConfirmEmailSlice.actions;

export const ConfirmEmail = (state: RootState) => state.confirmEmail.email;
export const IsLoading = (state: RootState) => state.confirmEmail.isLoading;
export const ConfirmEmailError = (state: RootState) => state.confirmEmail.error;
export const ConfirmationCode = (state: RootState) => state.confirmEmail.code;

export default ConfirmEmailSlice.reducer;
