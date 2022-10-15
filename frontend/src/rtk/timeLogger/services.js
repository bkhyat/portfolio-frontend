import axios from '../../axiosConfig';

const BASE_URL = process.env.REACT_APP_API_BASE_URL + "/time-logger/v1"

const fetchLogs = (date, search) => axios.get(BASE_URL)

const timeLoggerService = {
    fetchLogs
}

export default timeLoggerService;