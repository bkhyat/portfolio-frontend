import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL + "/resume/v1"


const fetchResume = () => axios.get(BASE_URL + "/users/" + process.env.REACT_APP_API_USER_ID + '/')

const resumeService = {
    fetchResume
}

export default resumeService;