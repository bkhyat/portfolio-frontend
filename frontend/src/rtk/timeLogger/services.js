import axios from '../../axiosConfig';

const BASE_URL = process.env.REACT_APP_API_BASE_URL + "/time-logger/v1"

const fetchLogs = (date, search) => axios.get(BASE_URL + '/')

const pushLog = (data) => axios.post(BASE_URL + '/', data)

const timeLoggerService = {
    fetchLogs,
    pushLog
}

export default timeLoggerService;