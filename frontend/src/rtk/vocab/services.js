import axios from "../../axiosConfig";

const BASE_URL = process.env.REACT_APP_API_BASE_URL + "/vocabs/v1"

const getWordsOfTheDay = () => {
    return axios.get(BASE_URL + '/sources/words-of-the-day/')
}

const fetchWordsInPage = (data) => {
    return axios.get(`${BASE_URL}/practice/${data}/words/`)
}

const fetchMeaning = (word) => {
    return axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
}

const fetchSets = () => {
    return axios.get(BASE_URL +'/practice/')
}
const vocabServices = {
    getWordsOfTheDay,
    fetchWordsInPage,
    fetchMeaning,
    fetchSets
};

export default vocabServices;