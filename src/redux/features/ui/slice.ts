import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
    isLaunchApp: boolean;
};

const initialState: TInitialState = {
    isLaunchApp: false,
};

export const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setLaunchApp: (state, action: PayloadAction<boolean>) => {
            state.isLaunchApp = action.payload;
        },
    },
});

export const { setLaunchApp } =
    uiSlice.actions;

export default uiSlice.reducer;
