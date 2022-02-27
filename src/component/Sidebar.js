import {useDispatch, useSelector} from "react-redux";
import {Menu} from "antd";
import {
    CalendarOutlined,
    ControlOutlined, GithubOutlined,
    ProfileOutlined,
    SolutionOutlined,
    VerifiedOutlined
} from "@ant-design/icons";
import {useState} from "react";
import axios from "../rtk/axiosConfig";

const Sidebar = () => {
    // const dispatch = useDispatch();
    // const nav = useSelector(state => state.nav)
    const [pro, setPro] = useState();

    const onNavItemSelect = ({key}) => {
        switch (key){
            case 'Profile':
                axios.get('/resume/v1/profiles/')
                    .then(resp => setPro(resp.data))
                    .catch(e => console.log(e))
        }

    }

    return (
        <Menu mode={'inline'} onClick={onNavItemSelect} theme={'dark'}>
            <Menu.SubMenu title={'RESUME'} key={'RESUME'} icon={<ProfileOutlined/>}>
                <Menu.Item key={'Profile'} icon={<SolutionOutlined/>}>
                    Profile
                </Menu.Item>
                <Menu.Item key={'Experience'} icon={<CalendarOutlined/>}>
                    Experience
                </Menu.Item>
                <Menu.Item key={'Education'} icon={<VerifiedOutlined/>}>
                    Education
                </Menu.Item>
                <Menu.Item key={'Skills'} icon={<ControlOutlined/>}>
                    Skills
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title={'DEMO'} key={'DEMO'}>
                <Menu.Item key={'Simple To Do'}>
                    Simple To Do
                </Menu.Item>
                <Menu.Item key={'Simple Quiz'}>
                    Simple Quiz
                </Menu.Item>
                <Menu.Item key={'Timed Quiz'}>
                    Time Quiz
                </Menu.Item>
                <Menu.Item key={'Resume Maker'} icon={<ProfileOutlined/>}>
                    Resume Maker
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key={'GITHUB REPO'} icon={<GithubOutlined/>}>
                GITHUB REPO
            </Menu.Item>
            <Menu.Item key={'STACKOVERFLOW'}>
                STACKOVERFLOW
            </Menu.Item>
        </Menu>
    )
}

export default Sidebar