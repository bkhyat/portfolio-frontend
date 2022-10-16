import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import timeLoggerService from "./services";
import {notification} from "antd";

const DAY_MAP = {0: "Mon", 1: "Tue", 2: "Wed", 3: "Thu", 4: "Fri", 5: "Sat", 6: "Sun"}

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
    async (data, thunkAPI) => {
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
            return thunkAPI.rejectWithValue()
        }
    }
)

export const fetchWeeklyLogs = createAsyncThunk(
    "timeLogger/fetchWeeklyLogs",
    async (data, thunkAPI) => {
        try {
            const resp = await timeLoggerService.fetchWeeklyLogs()
            return resp.data
        } catch (e) {
            notification.error({
                message: "Error Fetching Weekly Summary",
                description: e.message
            })
            return thunkAPI.rejectWithValue()
        }
    })

const initialState = {
    isLoading: false,
    isPushing: false,
    logsOfTheDay: [],
    weeklyLogs: [],
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
            },
            [fetchWeeklyLogs.fulfilled]: (state, action) => {
                const weeklyData = action.payload
                return {
                    ...state, weeklyLogs: [...Array(7).keys()].map((day_num) => ({
                        key: day_num,
                        day: DAY_MAP[day_num],
                        prevWeek: weeklyData['prev_week'][day_num] || 0,
                        thisWeek: weeklyData['this_week'][day_num] || 0
                    }))
                }
            }
        }
    }
)

export const {toggleLoading} = timeLoggerSlice.actions
export default timeLoggerSlice.reducer