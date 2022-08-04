import {Menu} from "antd";
import {NAV_ITEMS} from "./constants";
import {useEffect, useState} from "react";

const Sidebar = () => {
    const [currentPath, setCurrentPath] = useState('')

    useEffect(() => {
        pathChanged()
    }, [])

    const pathChanged = () => setCurrentPath(window.location.hash)
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