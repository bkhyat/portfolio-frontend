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
        }
    }
)

const initialState = {
    isLoading: false,
    logsOfTheDay: [],
    logsByDate: {}
}

const timeLoggerSlice = createSlice(
    {
        name: 'timeLogger',
        initialState,
        reducers: {
            toggleLoading: (state) => ({...state, isLoading: !state.isLoading})
        },
        extraReducers: {
            [fetchLogs.fulfilled]: (state, action) => {
                return {...state, isLoading: false, logsOfTheDay: action.payload}
            }
        }
    }
)

export const {toggleLoading} = timeLoggerSlice.actions
export default timeLoggerSlice.reducer