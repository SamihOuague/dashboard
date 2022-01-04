import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, list, update } from "../api/authApi";

export const authLogin = createAsyncThunk(
    "auth/authLogin",
    async (data) => {
        const response = await auth(data, "login");
        return response;
    }
);

export const authRegister = createAsyncThunk(
    "auth/authRegister",
    async (data) => {
        const response = await auth(data, "register");
        return response;
    }
);

export const updateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (data) => {
        const response = await update(data.body, data.token);
        return response;
    }
);

export const usersList = createAsyncThunk(
    "auth/usersList",
    async () => {
        const response = await list();
        return response;
    } 
)

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: false,
        fetching: false,
        message: null,
        login: true,
        email: "",
        users: []
    },
    reducers: {
        fetchStart: (state) => {
            state.fetching = true;
        },
        logRegister: (state) => {
            state.login = !state.login;
        },
        changeMsg: (state, action) => {
            state.message = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authLogin.fulfilled, (state, action) => {
            state.fetching = false;
            if (action.payload.message)
                state.message = action.payload.message;
            else if (action.payload.token) {
                state.token = action.payload.token;
                state.email = action.payload.email;
                state.message = null;
            }
        });

        builder.addCase(authRegister.fulfilled, (state, action) => {
            state.fetching = false;
            if (action.payload.message)
                state.message = action.payload.message;
            else if (action.payload.token) {
                state.token = action.payload.token;
                state.email = action.payload.email;
                state.message = null;
            }
        });

        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.fetching = false;
            if (action.payload.message)
                state.message = action.payload.message;
            if (action.payload.email) {
                state.email = action.payload.email;
            }
        });

        builder.addCase(usersList.fulfilled, (state, action) => {
            if (Array.isArray(action.payload))
                state.users = action.payload;
        });
    }
});

export const { fetchStart, logRegister, changeMsg } = authSlice.actions;

export default authSlice.reducer;