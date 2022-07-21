import axios from "axios";

const BASE_URL = process.env.REACT_APP_STACKOVERFLOW_BASE_URL
const DEFAULT_PARAM = {
    site: 'stackoverflow'
}

const getUserDetail = () => axios.get(BASE_URL,
    {
        params: {
            ...DEFAULT_PARAM
        }
    })

const getQuestion = () => axios.get()

const getAnswer = () => axios.get()

const getTopAnswers = () => axios.get(BASE_URL + '/answers',
    {
        params: {
            ...DEFAULT_PARAM,
            max: 10,
            order: 'desc',
            sort: 'votes'
        }
    })

const getTopQuestions = () => axios.get(BASE_URL + '/questions',
    {
        params: {
            ...DEFAULT_PARAM,
            max: 5,
            order: 'desc',
            sort: 'votes'
        }
    })

const getTopTags = () => axios.get(BASE_URL + '/top-tags',
    {
        params: {
            ...DEFAULT_PARAM,
            page: 1,
            pagesize: 10
        }
    })

const getTopAnswersByTag = (tag) => axios.get(BASE_URL + '/tags/' + tag + '/top-answers',
    {
        params: {
            ...DEFAULT_PARAM,
            order: 'desc',
            max: 10,
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
    getAnswer
}

export default stackoverflowService;