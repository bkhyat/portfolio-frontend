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
    "vocabs/fetch-page-counts",
    async (data, thunkAPI) => {
        try{
            const resp = await vocabServices.fetchWordsInPage({page: data?.page})
            return {
                page: data?.page,
                words: resp.data.results
            }
        } catch (e) {
            console.log(e)
            return thunkAPI.rejectWithValue("Could not fetch the pages")
        }
    }
)

export const fetchWordMeaning = createAsyncThunk(
    "vocab_/fetch-word-meaning",
    async ({word}, thunkAPI) => {
        if(Object.keys(thunkAPI.getState().vocab.meanings).includes(word)){
            thunkAPI.rejectWithValue("Meaning already fetched")
        }
        try{
            const resp = await vocabServices.fetchMeaning()
            return {
                word,
                meanings: resp.data
            }
        } catch (e) {
            console.log(e)
            thunkAPI.rejectWithValue("Could not fetch the meaning")
        }
    }
)

const initialState = {
    practiceSet: {
        pageCount: 0,
        fetchingPageCount: true,
        currentPage: 0,
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
        setCurrentPage: (state, action) => {
         state.practiceSet.currentPage = action.payload
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
            state.practiceSet[action.page] = action.words.map(({word}) => word)
            if(!action.page){
                state.practiceSet.fetchingPageCount = false
            }
        },
        [fetchPageCount.fulfilled]: (state, action) => {
          state.practiceSet.pageCount = action.payload.pageCount
        },
        [fetchWordsInPages.rejected]: (state)=> {
            state.practiceSet.fetchingPageCount = false
        },
        [fetchWordMeaning.fulfilled]: (state, action) => {
            state.meanings.isLoading = false
            state.meanings[action.word] = action.meanings
        },
        [fetchWordMeaning.rejected]: (state, action) => {
            state.meanings.isLoading = false
        },
        [fetchWordMeaning.pending]: (state, action) => {
            state.meanings.isLoading = true
        }
    }
})

export const {setCurrentPage,
    setPageCount,
    toggleFetchingPageCount,
setCurrentIndex} = VocabSlice.actions
export default VocabSlice.reducer;