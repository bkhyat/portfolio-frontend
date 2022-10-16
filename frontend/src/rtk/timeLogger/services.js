import axios from '../../axiosConfig';

const BASE_URL = process.env.REACT_APP_API_BASE_URL + "/time-logger/v1"

const fetchLogs = (queryParams) => {
    let params = {}
    if (!queryParams) {
        // Pass today's date if both date and search are empty
        params['date'] = new Date().toJSON().slice(0, 10)
    } else {
        params = queryParams
    }
    return axios.get(BASE_URL + '/', {params})
}

const pushLog = (data) => axios.post(BASE_URL + '/', data)

const fetchWeeklyLogs = () => axios.get(`${BASE_URL}/weekly-summary/`)

const timeLoggerService = {
    fetchLogs,
    pushLog,
    fetchWeeklyLogs
}

export default timeLoggerService;