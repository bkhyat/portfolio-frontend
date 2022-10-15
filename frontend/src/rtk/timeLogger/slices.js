import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import timeLoggerService from "./services";
import {notification} from "antd";


export const fetchLogs = createAsyncThunk(
    "timeLogger/fetchLogs",
    async (data, thunkAPI) => {
        try {
            const resp = await timeLoggerService.fetchLogs()
            return resp.data
        } catch (e) {
            notification.error({
                message: "Error fetching logs",
                description: e?.response?.data?.detail || e?.message || "Error fetching Log, try again later!"
            })
            return thunkAPI.rejectWithValue()
        }
    }
)

export const enterLog = createAsyncThunk(
    "timeLogger/enterLog",
    async (data, thinkAPI) => {
        try {
            const resp = await timeLoggerService.pushLog(data)
            return resp.data
        } catch (e) {
            let message;
            message = Object.keys(e?.response?.data || {}).map(key => (`${key}: ${e.response.data[key]}`)).join("\n")
            if (!message) {
                message = "Error Entering Log, Please try again later!"
            }
            notification.error({
                message: "Error Pushing log",
                description: message
            })
            return thinkAPI.rejectWithValue()
        }
    }
)

const initialState = {
    isLoading: false,
    isPushing: false,
    logsOfTheDay: [],
    logsByDate: {}
}

const timeLoggerSlice = createSlice(
    {
        name: 'timeLogger',
        initialState,
        reducers: {
            toggleLoading: (state) => ({...state, isLoading: !state.isLoading}),
            togglePushing: (state) => ({...state, isPushing: !state.isPushing})
        },
        extraReducers: {
            [fetchLogs.fulfilled]: (state, action) => {
                return {...state, isLoading: false, logsOfTheDay: action.payload}
            },
            [fetchLogs.rejected]: (state) => {
                return {...state, isLoading: false}
            },
            [enterLog.fulfilled]: (state, action) => {
                return {...state, logsOfTheDay: [...state.logsOfTheDay, action.payload], isPushing: false}
            },
            [enterLog.rejected]: (state) => {
                return {...state, isPushing: false}
            }
        }
    }
)

export const {toggleLoading} = timeLoggerSlice.actions
export default timeLoggerSlice.reducer