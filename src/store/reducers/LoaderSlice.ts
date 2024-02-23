import { createSlice } from '@reduxjs/toolkit';

export const LoaderSlice = createSlice({
    name: 'loader',
    initialState: {
        isLoading: false,
    },
    reducers: {
        ShowLoader: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { ShowLoader } = LoaderSlice.actions;
export default LoaderSlice.reducer;
