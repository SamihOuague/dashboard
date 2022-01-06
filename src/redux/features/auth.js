import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, list, update, remove, add } from "../api/authApi";

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

export const addUser = createAsyncThunk(
    "auth/addUser",
    async (data) => {
        const response = await add(data.user, data.token);
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
);

export const deleteUser = createAsyncThunk(
    "auth/deleteUser",
    async (data) => {
        const response = await remove(data.id, data.token);
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
        users: [],
        newUser: false,
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
        },
        openForm: (state) => {
            state.newUser = true;
        },
        closeForm: (state) => {
            state.newUser = false;
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

        builder.addCase(addUser.fulfilled, (state, action) => {
            state.fetching = false;
            if (action.payload.message)
                state.message = action.payload.message;
            else if (action.payload.user) {
                state.message = null;
                state.newUser = false;
                state.users = [...state.users, action.payload.user];
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
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            if (action.payload.docs) {
                state.users = state.users.filter((val) => {
                    return val._id !== action.meta.arg.id;
                });
            }
        });
    }
});

export const { fetchStart, logRegister, changeMsg, openForm, closeForm } = authSlice.actions;

export default authSlice.reducer;