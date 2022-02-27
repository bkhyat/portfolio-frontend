import {configureStore} from "@reduxjs/toolkit";
import navReducer from './nav/slices'


const store = configureStore(
    {
        reducer: {
            nav: navReducer
        }
    }
)

export default store