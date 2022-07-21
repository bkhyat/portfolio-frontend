import {useDispatch} from "react-redux";
import {Menu} from "antd";
import {useState} from "react";
import {navItemChanged} from "../rtk/nav/slices";
import {NAV_ITEMS} from "./constants";

const Sidebar = () => {
    // const dispatch = useDispatch();
    // const nav = useSelector(state => state.nav)
    const [pro, setPro] = useState();
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
            defualtOpenKeys={['resume']}
        />
    )
    // {/*<Menu mode={'inline'} onClick={onNavItemSelect} theme={'dark'}>*/}
    // {/*    <Menu.SubMenu title={'RESUME'} key={'RESUME'} icon={<ProfileOutlined/>}>*/}
    // {/*        <Menu.Item key={'Profile'} icon={<SolutionOutlined/>}>*/}
    // {/*            Profile*/}
    // {/*        </Menu.Item>*/}
    // {/*        <Menu.Item key={'Experience'} icon={<CalendarOutlined/>}>*/}
    // {/*            Experience*/}
    // {/*        </Menu.Item>*/}
    // {/*        <Menu.Item key={'Education'} icon={<VerifiedOutlined/>}>*/}
    // {/*            Education*/}
    // {/*        </Menu.Item>*/}
    // {/*        <Menu.Item key={'Skills'} icon={<ControlOutlined/>}>*/}
    // {/*            Skills*/}
    // {/*        </Menu.Item>*/}
    // {/*    </Menu.SubMenu>*/}
    // {/*    <Menu.SubMenu title={'DEMO'} key={'DEMO'}>*/}
    // {/*        <Menu.Item key={'Simple To Do'}>*/}
    // {/*            Simple To Do*/}
    // {/*        </Menu.Item>*/}
    // {/*        <Menu.Item key={'Simple Quiz'}>*/}
    // {/*            Simple Quiz*/}
    // {/*        </Menu.Item>*/}
    // {/*        <Menu.Item key={'Timed Quiz'}>*/}
    // {/*            Time Quiz*/}
    // {/*        </Menu.Item>*/}
    // {/*        <Menu.Item key={'Resume Maker'} icon={<ProfileOutlined/>}>*/}
    // {/*            Resume Maker*/}
    // {/*        </Menu.Item>*/}
    // {/*    </Menu.SubMenu>*/}
    // {/*    <Menu.Item key={'GITHUB REPO'} icon={<GithubOutlined/>}>*/}
    // {/*        GITHUB REPO*/}
    // {/*    </Menu.Item>*/}
    // {/*    <Menu.Item key={'STACKOVERFLOW'}>*/}
    // {/*        STACKOVERFLOW*/}
    // {/*    </Menu.Item>*/}
    // {/*</Menu>*/}
}

export default Sidebar