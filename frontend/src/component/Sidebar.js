import {Menu} from "antd";
import {NAV_ITEMS} from "./constants";
import {useEffect, useState} from "react";

const Sidebar = () => {
    const [currentPath, setCurrentPath] = useState('')

    useEffect(() => {
        pathChanged()
    }, [])
    console.log(currentPath)
    const pathChanged = () => setCurrentPath(window.location.pathname)
    return (
        <Menu
            mode={'inline'}
            onClick={pathChanged}
            theme={'dark'}
            items={NAV_ITEMS}
            defaultSelectedKeys={['/']}
            selectedKeys={currentPath}
        />
    )
}

export default Sidebar;