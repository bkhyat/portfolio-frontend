import {Menu} from "antd";
import {NAV_ITEMS} from "./constants";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logout, toggleLoginModalVisible} from "../rtk/auth/slices";

const Sidebar = () => {
    const [currentPath, setCurrentPath] = useState('');
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector(state => state.auth);

    useEffect(() => {
        pathChanged()
    }, [])

    const pathChanged = (option) => {
        const key = option?.key

        switch (key) {
            case 'login':
                dispatch(toggleLoginModalVisible())
                break;
            case 'logout':
                dispatch(logout())
                break;
            default:
                setCurrentPath(window.location.hash)
        }

    }
    return (
        <Menu
            mode={'inline'}
            onClick={pathChanged}
            theme={'dark'}
            items={isLoggedIn ? NAV_ITEMS.filter(item => item.key !== 'login') : NAV_ITEMS.filter(item => item.key !== 'logout')}
            defaultSelectedKeys={['/']}
            selectedKeys={currentPath}
        />
    )
}

export default Sidebar;