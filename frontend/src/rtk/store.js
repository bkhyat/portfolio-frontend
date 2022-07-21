import {configureStore} from "@reduxjs/toolkit";
import navReducer from './nav/slices'
import resumeReducer from './resume/slices'
import stackoverflowRecuer from "./stackoverflow/slices";


const store = configureStore(
    {
        reducer: {
            nav: navReducer,
            resume: resumeReducer,
            stackoverflow: stackoverflowRecuer
        }
    }
)

export default store