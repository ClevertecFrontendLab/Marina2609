import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { push } from 'redux-first-history';
import { ShowLoader } from './LoaderSlice';
import { RootState } from '../../redux/ConfigureStore';
import { PasswordData } from '../../types';
import { FetchChangePassword } from '../actions/Actions';

interface ChangePasswordState {
    isLoading: boolean;
    error: Error | null;
}

const initialState: ChangePasswordState = {
    isLoading: false,
    error: null,
};

export const ChangePasswordAsync = createAsyncThunk<void, PasswordData, { rejectValue: Error }>(
    'auth/changePassword',
    async (payload, thunkAPI) => {
        try {
            thunkAPI.dispatch(ShowLoader(true));
            await FetchChangePassword(payload);
            thunkAPI.dispatch(changePasswordSuccess());
            thunkAPI.dispatch(push('/result/success-change-password', { fromServer: true }));
        } catch (error: unknown) {
            const changePasswordError = error as Error;
            thunkAPI.dispatch(changePasswordFailure(changePasswordError));
            thunkAPI.dispatch(push('/result/error-change-password', { fromServer: true }));
            return thunkAPI.rejectWithValue(changePasswordError);
        } finally {
            thunkAPI.dispatch(ShowLoader(false));
        }
    },
);

const ChangePasswordSlice = createSlice({
    name: 'changePassword',
    initialState,
    reducers: {
        changePasswordSuccess: (state) => {
            state.isLoading = false;
            state.error = null;
        },
        changePasswordFailure: (state, action: PayloadAction<Error>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(ChangePasswordAsync.pending, (state) => {
            state.isLoading = true;
        });
    },
});

export const { changePasswordSuccess, changePasswordFailure } = ChangePasswordSlice.actions;

export const IsLoading = (state: RootState) => state.changePassword.isLoading;
export const ChangePasswordError = (state: RootState) => state.changePassword.error;

export default ChangePasswordSlice.reducer;
