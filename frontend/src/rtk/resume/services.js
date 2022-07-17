import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL + "/resume/v1"


const fetchProfiles = () => axios.get(BASE_URL + "/profiles")

const resumeService = {
    fetchProfiles
}

export default resumeService;