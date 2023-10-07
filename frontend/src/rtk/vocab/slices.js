import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import vocabServices from "./services";

export const fetchWordsOfTheDay = createAsyncThunk(
    "vocabs/words-of-the-day",
    async (data, thunkAPI) => {
        try{
            const resp = await vocabServices.getWordsOfTheDay()
            for(let i=0; i<resp.data.length; i++){
                const meaning = await vocabServices.fetchMeaning(resp.data[i])
                // const meaning = await vocabServices.fetchMeaning("crook")
                if (meaning.data?.title !== "No Definitions Found"){
                    return meaning.data;
                }
            }
        } catch (e) {
            thunkAPI.rejectWithValue("Could not fetch at the moment!")
        }
    }
)

export const fetchPageCount = createAsyncThunk(
    "vocabs/fetch-page-counts",
    async (data, thunkAPI) => {
        try{
            const resp = await vocabServices.fetchWordsInPage()
            console.log(resp.data)
            return {pageCount: resp.data.page_count}
        } catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue("Could not fetch the pages")
        }
    }
)

export const fetchWordsInPages = createAsyncThunk(
    "vocabs/fetch-words-in-set",
    async (data, thunkAPI) => {
        try{
            const resp = await vocabServices.fetchWordsInPage(data)
            return {
                set: data,
                data: resp.data
            }
        } catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue("Could not fetch the pages")
        }
    }
)

export const fetchWordMeaning = createAsyncThunk(
    "vocab/fetch-word-meaning",
    async (data, thunkAPI) => {
        if(Object.keys(thunkAPI.getState().vocab.meanings).includes(data)){
            thunkAPI.rejectWithValue("Meaning already fetched")
        }
        try{
            const resp = await vocabServices.fetchMeaning(data)
            return {
                word: data,
                meanings: resp.data
            }
        } catch (e) {
            console.log(e)
            thunkAPI.rejectWithValue("Could not fetch the meaning")
        }
    }
)

export const fetchSets = createAsyncThunk(
    "vocab/fetch-sets",
    async (data, thunkAPI) => {
        try{
            const resp = await vocabServices.fetchSets()
            return resp.data
        }catch (e) {
            thunkAPI.rejectWithValue("Could not fetch sets")
        }
    }
)
const initialState = {
    practiceSet: {
        allSets: [],
        pageCount: 0,
        fetchingPageCount: true,
        selectedSet: [],
        currentIndex: -1
    },
    cards: [
    ],
    wordOfTheDay: [],
    meanings: {
        isLoading: false
    }
}

const VocabSlice = createSlice({
    initialState,
    name: "vocabSlice",
    reducers: {
        setPageCount: (state, {pageCount}) => {
            state.practiceSet.pageCount=pageCount
        },
        setSelectedSet: (state, action) => {
         state.practiceSet.selectedSet = action.payload
        },
        toggleFetchingPageCount: (state) => {
            state.practiceSet.fetchingPageCount = !state.practiceSet.fetchingPageCount
        },
        setCurrentIndex: (state, action) => {
            state.practiceSet.currentIndex = action.payload
        }
    },
    extraReducers: {
        [fetchWordsOfTheDay.fulfilled]: (state, action) => {
            return {...state, wordOfTheDay: action.payload}
        },
        [fetchWordsInPages.fulfilled]: (state, action) => {
            state.practiceSet[action.payload.set] = action.payload.data.map(({word}) => word)
        },
        [fetchPageCount.fulfilled]: (state, action) => {
          state.practiceSet.pageCount = action.payload.pageCount
        },
        [fetchWordsInPages.rejected]: (state)=> {
            state.practiceSet.fetchingPageCount = false
        },
        [fetchWordMeaning.fulfilled]: (state, action) => {
            state.meanings.isLoading = false
            state.meanings[action.payload.word] = action.payload.meanings
        },
        [fetchWordMeaning.rejected]: (state, action) => {
            state.meanings.isLoading = false
        },
        [fetchWordMeaning.pending]: (state, action) => {
            state.meanings.isLoading = true
        },
        [fetchSets.fulfilled]: (state, action) => {
            state.practiceSet.allSets = [...action.payload]
        },
        [fetchSets.rejected]: (state, action) => {

        }
    }
})

export const {setCurrentPage,
    setSelectedSet,
    toggleFetchingPageCount,
setCurrentIndex} = VocabSlice.actions
export default VocabSlice.reducer;