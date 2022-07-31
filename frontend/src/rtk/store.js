import {configureStore} from "@reduxjs/toolkit";
import resumeReducer from './resume/slices'
import stackoverflowRecuer from "./stackoverflow/slices";


const store = configureStore(
    {
        reducer: {
            resume: resumeReducer,
            stackoverflow: stackoverflowRecuer
        }
    }
)

export default store