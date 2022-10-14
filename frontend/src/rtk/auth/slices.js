import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authService from "./services";
import {notification} from "antd";

export const login = createAsyncThunk(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const resp = await authService.login(data)
            localStorage.setItem("access", `Bearer ${resp.data["access"]}`)
            return resp.data;
        } catch (e) {
            notification.error({
                message: "Error Logging in",
                description: e?.response?.data?.detail || e?.message || "Something went wrong, try again later!"
            })
            return thunkAPI.rejectWithValue()
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (data, thunkAPI) => {
        const refresh = thunkAPI.getState().auth.refresh
        try {
            await authService.logout(refresh)
        } catch (e) {
            notification.error({
                message: "Could not log out",
                description: e?.response?.data?.detail || e?.message || "Something went wrong, please try again!"
            })
            return thunkAPI.rejectWithValue()
        }
    }
)
const initialState = {
    isLoggedIn: false,
    isLoading: false,
    access: '',
    refresh: '',
    isLoginModalVisible: false,
}

const authSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            toggleLoading: (state) => ({...state, isLoading: !state.isLoading}),
            toggleLoginModalVisible: state => ({...state, isLoginModalVisible: !state.isLoginModalVisible})
        },
        extraReducers: {
            [login.fulfilled]: (state, action) => {
                state.isLoading = false
                state.isLoggedIn = true
                state.access = `Bearer ${action.payload.access}`
                state.refresh = action.payload.refresh
            },
            [login.rejected]: (state, action) => ({...state, isLoggedIn: false, isLoading: false}),
            [logout.fulfilled]: (state) => {
                localStorage.removeItem("access")
                state.isLoggedIn = false
                state.access = ''
                state.refresh = ''
            }
        }
    }
)

export const {toggleLoading, toggleLoginModalVisible} = authSlice.actions
export default authSlice.reducer;