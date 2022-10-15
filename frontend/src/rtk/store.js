import {configureStore} from "@reduxjs/toolkit";
import resumeReducer from './resume/slices'
import stackoverflowReducer from "./stackoverflow/slices";
import authReducer from './auth/slices';
import timeLoggerReducer from './timeLogger/slices';


const store = configureStore(
    {
        reducer: {
            resume: resumeReducer,
            stackoverflow: stackoverflowReducer,
            auth: authReducer,
            timeLogger: timeLoggerReducer
        }
    }
)

export default store