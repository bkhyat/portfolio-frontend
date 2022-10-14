import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import resumeService from "./services";
import {notification} from "antd";


export const fetchResume = createAsyncThunk(
    "resume/fetchResume",
    async (data, thunkAPI) => {
        thunkAPI.dispatch(toggleResumeLoading())
        try {
            const resp = await resumeService.fetchResume()
            return resp.data
        } catch {
            notification.error('Server error occurred, Please come back later', 3)
            return thunkAPI.rejectWithValue("Error fetching profiles. Try again later!")
        }
    }
)
const initalResume = {
    isResumeLoading: false,
    profiles: [],
    contacts: [],
    experiences: [],
    education: [],
    skills: {soft_skills: [], tech_skills: {}},
    interests: []
}
const resumeSlice = createSlice({
    name: "resume",
    initialState: initalResume,
    reducers: {
        toggleResumeLoading: (state, action) => {
            state.isResumeLoading = !state.isResumeLoading
        }
    },
    extraReducers: {
        [fetchResume.fulfilled]: (state, action) => {
            const {contacts, ...rest} = {...action.payload}
            const revisedContacts = {}
            contacts.forEach(contact => {
                switch (contact.contact_type.toLowerCase()) {
                    case 'mobile':
                        revisedContacts['Mobile'] = contact.contact_info
                        break;
                    case 'email':
                        revisedContacts['Email'] = contact.contact_info
                        break;
                    case 'linkedin':
                        revisedContacts['LinkedIn'] = contact.contact_info
                        break;
                    case 'github':
                        revisedContacts['GitHub'] = contact.contact_info
                        break;
                    case 'stackoverflow':
                        revisedContacts['StackOverflow'] = contact.contact_info
                        break;
                    default:
                        revisedContacts[contact.contact_type] = contact.contact_info
                }
            })
            return {...rest, contacts: {...revisedContacts}, isResumeLoading: false}
        },
        [fetchResume.rejected]: (state) => {
            state.isResumeLoading = false
        }
    }
})

const {toggleResumeLoading} = resumeSlice.actions

export default resumeSlice.reducer
