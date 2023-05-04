import {configureStore} from "@reduxjs/toolkit";
import resumeReducer from './resume/slices'
import stackoverflowReducer from "./stackoverflow/slices";
import authReducer from './auth/slices';
import timeLoggerReducer from './timeLogger/slices';
import vocabReducer from './vocab/slices'


const store = configureStore(
    {
        reducer: {
            resume: resumeReducer,
            stackoverflow: stackoverflowReducer,
            auth: authReducer,
            timeLogger: timeLoggerReducer,
            vocab: vocabReducer
        }
    }
)

export default store