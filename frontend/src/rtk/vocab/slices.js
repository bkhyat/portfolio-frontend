import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import vocabServices from "./services";

export const fetchWordsOfTheDay = createAsyncThunk(
    "vocabs/words-of-the-day",
    async (data, thunkAPI) => {
        try{
            const resp = await vocabServices.getWordsOfTheDay()
            for(let i=0; i<resp.data.length; i++){
                // const meaning = await vocabServices.fetchMeaning(resp.data[i])
                const meaning = await vocabServices.fetchMeaning("crook")
                console.log(meaning.data)
                if (meaning.data?.title !== "No Definitions Found"){
                    return meaning.data[0];
                }
            }
        } catch (e) {
            thunkAPI.rejectWithValue("Could not fetch at the moment!")
        }
    }
)

const initialState = {
    cards: [
    ],
    wordOfTheDay: {}
}

const VocabSlice = createSlice({
    initialState,
    name: "vocabSlice",
    reducers: {

    },
    extraReducers: {
        [fetchWordsOfTheDay.fulfilled]: (state, action) => {
            return {...state, wordOfTheDay: action.payload}
        }
    }
})

export default VocabSlice.reducer;