import axios from "axios";

const BASE_URL = process.env.REACT_APP_STACKOVERFLOW_BASE_URL
const USER_BASE_URL = process.env.REACT_APP_STACKOVERFLOW_BASE_URL +
    `/users/${process.env.REACT_APP_STACK_OVERFLOW_PROFILE_ID}`

const PROFILE_FILTER = '!)68Yd_uQOe89nTtAMKP-xDDa2Ftz'
const ANSWER_FILTER = '!nKzQURFm*e'
const QUESTION_FILTER = '!Oev7Wya*OXfNtEKHrq7e0CZLZB.ndh4GbmdnAB0pQ6F'
const TOP_QUESTION_FILTER = '!OeuR_holTE.x25j_s6N6EvGlSY(dayqLZk-084icI1Z'

const DEFAULT_PARAM = {
    site: 'stackoverflow',
}
const TIME_OUT = 5000

const getUserDetail = () => axios.get(USER_BASE_URL,
    {
        timeout: TIME_OUT,
        params: {
            ...DEFAULT_PARAM,
            filter: PROFILE_FILTER
        }
    })

const getQuestion = (ids) => axios.get(BASE_URL + '/questions/' + ids,
    {
        timeout: TIME_OUT,
        params: {
            ...DEFAULT_PARAM,
            filter: QUESTION_FILTER
        }
    }
)

const getTopAnswers = () => axios.get(USER_BASE_URL + '/answers',
    {
        timeout: TIME_OUT,
        params: {
            ...DEFAULT_PARAM,
            page: 1,
            pagesize: 10,
            order: 'desc',
            sort: 'votes',
            filter: ANSWER_FILTER
        }
    })

const getTopQuestions = () => axios.get(USER_BASE_URL + '/questions',
    {
        timeout: TIME_OUT,
        params: {
            ...DEFAULT_PARAM,
            page: 1,
            pagesize: 4,
            order: 'desc',
            sort: 'votes',
            filter: TOP_QUESTION_FILTER
        }
    })

const getTopTags = () => axios.get(USER_BASE_URL + '/top-tags',
    {
        timeout: TIME_OUT,
        params: {
            ...DEFAULT_PARAM,
            page: 1,
            pagesize: 10
        }
    })

const getTopAnswersByTag = (tag) => axios.get(USER_BASE_URL + '/tags/' + tag + '/top-answers',
    {
        timeout: TIME_OUT,
        params: {
            ...DEFAULT_PARAM,
            order: 'desc',
            filter: ANSWER_FILTER,
            page: 1,
            pagesize: 10,
            sort: 'votes',
        }
    })


const stackoverflowService = {
    getUserDetail,
    getTopAnswers,
    getTopQuestions,
    getTopTags,
    getTopAnswersByTag,
    getQuestion,
}

export default stackoverflowService;