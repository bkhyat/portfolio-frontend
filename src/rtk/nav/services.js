import axios from "axios";


const fetchNavItems = () => {
    return axios.get(
        '/navItems'
    )
}

const navServices = {
    fetchNavItems,
}

export default navServices