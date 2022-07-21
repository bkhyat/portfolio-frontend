import {useDispatch, useSelector} from "react-redux";
import {Menu} from "antd";
import {navItemChanged} from "../rtk/nav/slices";
import {NAV_ITEMS} from "./constants";

const Sidebar = () => {
    const {currentNavItem} = useSelector(state => state.nav)
    const dispatch = useDispatch();

    const onNavItemSelect = ({key}) => {
        dispatch(navItemChanged(key))
    }

    return (
        <Menu
            mode={'inline'}
            onClick={onNavItemSelect}
            theme={'dark'}
            items={NAV_ITEMS}
            selectedKeys={currentNavItem}
        />
    )
}

export default Sidebar