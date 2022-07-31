import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import stackoverflowService from "./services";


export const fetchUserDetail = createAsyncThunk(
    'stackoverflow/userDetail',
    async (data, thunkAPI) => {
        try {
            const resp = await stackoverflowService.getUserDetail()
            return resp.data
        } catch {
            return thunkAPI.rejectWithValue('Could not process at the moment. Try again later!')
        }
    }
)


export const fetchTopTags = createAsyncThunk(
    "stakcoverflow/topTags",
    async (data, thunkAPI) => {
        try {
            const resp = await stackoverflowService.getTopTags()
            thunkAPI.dispatch(changeCurrentTag({tag: resp.data.items[0]?.tag_name}))
            return resp.data.items
        } catch {
            return thunkAPI.rejectWithValue('Could not process at the moment. Try again later!')
        }
    }
)


export const fetchAnswersByTag = createAsyncThunk(
    "stackoverflow/topAnswersByTags",
    async (data, thunkAPI) => {
        thunkAPI.dispatch(toggleTopAnswersByTagLoading())
        if (!data?.tag) return thunkAPI.rejectWithValue("No Tag passed!")
        try {
            if (!(Object.keys(thunkAPI.getState().stackoverflow.topAnswersByTag.answers).includes(data.tag))) {
                const answers = await stackoverflowService.getTopAnswersByTag(data.tag)
                const questions = await stackoverflowService.getQuestion(answers.data.items.map(item => item.question_id).join(';'))

                return {
                    tagName: data.tag,
                    answers: answers?.data?.items,
                    questions: questions?.data?.items
                }
            } else {
                return thunkAPI.rejectWithValue("Data already exits")
            }
        } catch {
            return thunkAPI.rejectWithValue('Could not process at the moment. Try again later!')
        }
    }
)

export const fetchTopAnswers = createAsyncThunk(
    "stackoverflow/fetchTopAnswers",
    async (data, thunkAPI) => {
        try {
            const answers = await stackoverflowService.getTopAnswers()
            const questions = await stackoverflowService.getQuestion(answers.data.items.map(item => item.question_id).join(';'))
            return {
                questions: questions.data.items,
                answers: answers.data.items
            }
        } catch {
            return thunkAPI.rejectWithValue('Could not process at the moment. Try again later!')
        }
    }
)

export const fetchTopQuestions = createAsyncThunk(
    "stackoverflow/fetchTopQuestions",
    async (data, thunkAPI) => {
        try {
            const resp = await stackoverflowService.getTopQuestions()

            return resp.data
        } catch {
            return thunkAPI.rejectWithValue('Could not process at the moment. Try again later!')
        }
    }
)

const initialState = {
    userDetail: {
        isLoading: true
    },
    topTags: {
        isLoading: true,
        data: []
    },
    topAnswersByTag: {
        isLoading: false,
        currentTag: '',
        answers: {},
        questions: {}
    },
    topAnswers: {questions: [], answers: [], isLoading: true},
    topQuestions: {questions: {}, isLoading: true},
    questionModal: {question: {}, answer: {}, isVisible: false}
}

const stackoverflowSlice = createSlice(
    {
        name: "stackoverflow",
        initialState,
        reducers: {
            toggleTopAnswersByTagLoading: (state) => {
                state.topAnswersByTag.isLoading = !state.topAnswersByTag.isLoading
            },
            changeCurrentTag: (state, action) => {
                state.topAnswersByTag.currentTag = action.payload.tag
            },
            changeSelectedQuestion: (state, action) => {
                state.questionModal.question = action.payload.question
                state.questionModal.answer = action.payload.answer
            },
            toggleQuestionModalVisible: (state) => {
                state.questionModal.isVisible = !state.questionModal.isVisible
            }
        },
        extraReducers: {
            [fetchUserDetail.fulfilled]: (state, action) => {
                // const {badge_counts, ...rest} = action.payload.items[0]
                state.userDetail = {
                    ...action.payload.items[0],
                    isLoading: false
                }
            },
            [fetchUserDetail.rejected]: (state, action) => {
                state.userDetail.isLoading = false
            },
            [fetchTopTags.fulfilled]: (state, action) => {
                state.topTags.isLoading = false
                state.topTags.data = action.payload
            },
            [fetchTopTags.rejected]: (state) => {
                state.topTags.isLoading = false
            },
            [fetchAnswersByTag.fulfilled]: (state, action) => {
                state.topAnswersByTag.answers[action.payload.tagName] = action.payload.answers
                state.topAnswersByTag.questions[action.payload.tagName] = action.payload.questions
                state.topAnswersByTag.isLoading = false
            },
            [fetchAnswersByTag.rejected]: (state) => {
                state.topAnswersByTag.isLoading = false
            },
            [fetchTopAnswers.fulfilled]: (state, action) => {
                state.topAnswers.questions = action.payload.questions
                state.topAnswers.answers = action.payload.answers
                state.topAnswers.isLoading = false
            },
            [fetchTopAnswers.rejected]: state => {
                state.topAnswers.isLoading = false
            },
            [fetchTopQuestions.fulfilled]: (state, action) => {
                state.topQuestions.questions = action.payload.items
                state.topQuestions.isLoading = false
            },
            [fetchTopQuestions.rejected]: (state, action) => {
                state.topQuestions.isLoading = false
            }
        }
    }
)

export const {
    toggleTopAnswersByTagLoading,
    changeCurrentTag,
    changeSelectedQuestion,
    toggleQuestionModalVisible
} = stackoverflowSlice.actions
const stackoverflowReducer = stackoverflowSlice.reducer
export default stackoverflowReducer;