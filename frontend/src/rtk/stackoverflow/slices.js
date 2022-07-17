import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import stackoverflowService from "./services";


export const fetchUserDetail = createAsyncThunk(
    'stackoverflow/userDetail',
    async (data, thunkAPI) => {
        try {
            const resp = await stackoverflowService.getUserDetail()
            return resp.data
        } catch {
            thunkAPI.rejectWithValue('Could not process at the moment. Try again later!')
        }
    }
)


const initialState = {
    userDetail: {
        // bronze: -1,
        // silver: -1,
        // gold: -1,
        // lastAccessed: Date.now(),
        // createdAt: Date.now(),
        // reputation: -1,
        // userID: '',
        // location: '',
        // profileLink: '',
        // displayName: ''
    }
}

const stackoverflowSlice = createSlice(
    {
        name: "stackoverflow",
        initialState,
        extraReducers: {
            [fetchUserDetail.fulfilled]: (state, action) => {
                // const {badge_counts, ...rest} = action.payload.items[0]
                state.userDetail = {
                    ...action.payload.items[0]
                    // ...badge_counts,
                    // lastAccessed: rest.last_access_date,
                    // reputation: rest.reputation,
                    // createdAt: rest.creation_date,
                    // userID: rest.user_id,
                    // location: rest.location,
                    // profileLink: rest.link,
                    // displayName: rest.display_name
                }
            },
            [fetchUserDetail.rejected]: (state, action) => {

            }
        }
    }
)

const stackoverflowRecuer = stackoverflowSlice.reducer
export default stackoverflowRecuer;