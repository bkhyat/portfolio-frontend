import axios from "axios";

const instance = axios.create();

instance.interceptors.request.use(function (config) {
    const access = localStorage.getItem('access')
    if (access) {
        return {...config, headers: {...config.headers, Authorization: access}}
    }
    return config
})

export default instance;