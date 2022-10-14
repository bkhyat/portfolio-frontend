import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL + "/auth/v1"
const TIME_OUT = 7000

const login = (data) => axios.post(BASE_URL + '/login/', data, {timeout: TIME_OUT})

const logout = refresh => axios.post(BASE_URL + '/logout/', {refresh}, {timeout: TIME_OUT})

const requestNewToken = refresh => axios.post(BASE_URL + '/refresh/', {refresh}, {timeout: TIME_OUT})

const authService = {
    login,
    logout,
    requestNewToken
}

export default authService;