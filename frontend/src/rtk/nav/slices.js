import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchNavItems = createAsyncThunk(
    'nav/fetchNavItems',
    async (data = {}, thunkAPI) => {
        console.log('get promise')
        const promise = await new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.5 ? resolve('Resolved') : reject('Could not resolve')
                console.log('TimeOut')
            }, 300)
        })
        return promise
        // return promise;
        // try{
        //
        //     // return await navServices.fetchNavItems()
        // }catch (err){
        //     console.log(err)
        //     thunkAPI.rejectWithValue('Error fetching Nav Items')
        // }
    })

const initialState = {
    navItems: [],
    currentNavItem: "profile",
    isLoading: false
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        navItemChanged: (state, action) => {
            state.currentNavItem = action.payload
        }
    },
    extraReducers: {
        [fetchNavItems.fulfilled]: (state, action) => {
            console.log('Fulfilled')
            state.isLoading = true
        },
        [fetchNavItems.pending]: (state, action) => {
            state.isLoading = true;
            console.log('Pending', action)
        },
        [fetchNavItems.rejected]: (state, action) => {
            console.log('Rejected')
            state.isLoading = false
        }
    }
})

export const { navItemChanged } = navSlice.actions
export default navSlice.reducer
