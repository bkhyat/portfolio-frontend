import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import timeLoggerService from "./services";
import { notification } from "antd";

const DAY_MAP = { 0: "Mon", 1: "Tue", 2: "Wed", 3: "Thu", 4: "Fri", 5: "Sat", 6: "Sun" };

export const fetchLogs = createAsyncThunk(
  "timeLogger/fetchLogs",
  async (data, thunkAPI) => {
    try {
      const resp = await timeLoggerService.fetchLogs();
      return resp.data;
    } catch (e) {
      notification.error({
        message: "Error fetching logs",
        description: e?.response?.data?.detail || e?.message || "Error fetching Log, try again later!"
      });
      return thunkAPI.rejectWithValue();
    }
  }
);

export const enterLog = createAsyncThunk(
  "timeLogger/enterLog",
  async (data, thunkAPI) => {
    try {
      const resp = await timeLoggerService.pushLog(data);
      return resp.data;
    } catch (e) {
      let message;
      message = Object.keys(e?.response?.data || {}).map(key => (`${key}: ${e.response.data[key]}`)).join("\n");
      if (!message) {
        message = "Error Entering Log, Please try again later!";
      }
      notification.error({
        message: "Error Pushing log",
        description: message
      });
      return thunkAPI.rejectWithValue();
    }
  }
);

export const filterLogs = createAsyncThunk(
  "timeLogger/filterLogs",
  async (data, thunkAPI) => {
    try {
      const resp = await timeLoggerService.fetchLogs(data);
      return resp.data;
    } catch (e) {
      console.log("error fetching log", e.message);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const fetchWeeklyLogs = createAsyncThunk(
  "timeLogger/fetchWeeklyLogs",
  async (data, thunkAPI) => {
    try {
      const resp = await timeLoggerService.fetchWeeklyLogs();
      return resp.data;
    } catch (e) {
      // notification.error({
      //   message: "Error Fetching Weekly Summary",
      //   description: e.message
      // });
      return thunkAPI.rejectWithValue();
    }
  });

const initialState = {
  isLoading: false,
  isPushing: false,
  logsOfTheDay: [],
  weeklyLogs: {
    isLoading: false,
    logs: []
  },
  logsByDate: {},
  filteredLogs: {
    dates: [],
    search: "",
    logs: [],
    summary: [],
    isLoading: false
  }
};

const timeLoggerSlice = createSlice(
  {
    name: "timeLogger",
    initialState,
    reducers: {
      toggleLoading: (state) => ({ ...state, isLoading: !state.isLoading }),
      togglePushing: (state) => ({ ...state, isPushing: !state.isPushing }),
      toggleWeeklyLoading: (state) => ({
        ...state,
        weeklyLogs: { ...state.weeklyLogs, isLoading: !state.weeklyLogs.isLoading }
      }),
      toggleFilterLoading: (state) => {
        state.filteredLogs.isLoading = !state.filteredLogs.isLoading
      }
    },
    extraReducers: {
      [fetchLogs.fulfilled]: (state, action) => {
        return { ...state, isLoading: false, logsOfTheDay: action.payload };
      },
      [fetchLogs.rejected]: (state) => {
        return { ...state, isLoading: false };
      },
      [enterLog.fulfilled]: (state, action) => {
        return { ...state, logsOfTheDay: [...state.logsOfTheDay, action.payload], isPushing: false };
      },
      [enterLog.rejected]: (state) => {
        return { ...state, isPushing: false };
      },
      [fetchWeeklyLogs.fulfilled]: (state, action) => {
        const weeklyData = action.payload;
        return {
          ...state, weeklyLogs: {
            logs: [...Array(7).keys()].map((day_num) => ({
              key: day_num,
              day: DAY_MAP[day_num],
              prevWeek: weeklyData["prev_week"][day_num] || 0,
              thisWeek: weeklyData["this_week"][day_num] || 0
            })), isLoading: false
          }
        };
      },
      [fetchWeeklyLogs.rejected]: (state) => {
        state.weeklyLogs.isLoading = false;
      },
      [filterLogs.fulfilled]: (state, action) => {
        state.filteredLogs.logs = action.payload.logs;
        state.filteredLogs.summary = action.payload.summary;
        state.filteredLogs.isLoading = false
        //   action.payload.reduce((groups, item) => ({
        //   ...groups,
        //   [item.date]: ((groups?.[item.date]||{})?.duration_in_minutes||0)+item.duration_in_minutes
        // }), {})
      }
    }
  }
);

export const { toggleLoading, toggleWeeklyLoading, toggleFilterLoading } = timeLoggerSlice.actions;
export default timeLoggerSlice.reducer;