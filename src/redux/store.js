import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/auth";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
    }
});