import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import resumeService from "./services";


export const fetchProfiles = createAsyncThunk(
    "resume/profiles",
    async (data, thunkAPI) => {
        thunkAPI.dispatch(toggleProfileLoading())
        try {
            const resp = await resumeService.fetchProfiles()
            return resp.data
        } catch {
            return thunkAPI.rejectWithValue("Error fetching profiles. Try again later!")
        }
    }
)
const initalResume = {
    profiles: {isLoading: false, profiles: []},
    experiences: [],
    education: [],
    skills: []
}
const resumeSlice = createSlice({
    name: "resume",
    initialState: initalResume,
    reducers: {
        toggleProfileLoading: (state, action) => {
            state.isLoading = !state.isLoading
        }
    },
    extraReducers: {
        [fetchProfiles.fulfilled]: (state, action) => {
            state.profiles.profiles = action.payload
            state.profiles.isLoading = false
        },
        [fetchProfiles.rejected]: (state, action) => {
            state.profiles.isLoading = false
        }
    }
})

const {toggleProfileLoading} = resumeSlice.actions

export default resumeSlice.reducer
