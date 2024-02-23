import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { push } from 'redux-first-history';
import { Error, FetchEmail } from '../actions/Actions';
import { ShowLoader } from './LoaderSlice';
import { RootState } from '../../redux/ConfigureStore';

interface EmailState {
    isLoading: boolean;
    email: string;
    error: Error | null;
}

const initialState: EmailState = {
    isLoading: false,
    email: '',
    error: null,
};

export const EmailAsync = createAsyncThunk<void, string, { rejectValue: Error }>(
    'auth/checkEmail',
    async (payload, thunkAPI) => {
        try {
            thunkAPI.dispatch(ShowLoader(true));
            await FetchEmail(payload);
            thunkAPI.dispatch(emailSuccess(payload));
            thunkAPI.dispatch(push('/auth/confirm-email', { fromServer: true }));
        } catch (error: unknown) {
            const emailError = error as Error;
            if (emailError.statusCode === 404 && emailError.message === 'Email не найден') {
                thunkAPI.dispatch(push('/result/error-check-email-no-exist', { fromServer: true }));
            } else {
                sessionStorage.setItem('email', JSON.stringify(payload));
                thunkAPI.dispatch(push('/result/error-check-email', { fromServer: true }));
            }
            return thunkAPI.rejectWithValue(emailError);
        } finally {
            thunkAPI.dispatch(ShowLoader(false));
        }
    },
);

export const EmailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        emailSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.email = action.payload;
            state.error = null;
        },
        emailFailure: (state, action: PayloadAction<Error>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(EmailAsync.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(EmailAsync.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as Error;
        });
        builder.addCase(EmailAsync.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
        });
    },
});

export const { emailSuccess, emailFailure } = EmailSlice.actions;

export const IsLoading = (state: RootState) => state.email.isLoading;
export const Email = (state: RootState) => state.email.email;
export const EmailError = (state: RootState) => state.email.error;

export default EmailSlice.reducer;
