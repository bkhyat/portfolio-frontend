import {CalendarOutlined, CopyrightCircleOutlined, GithubOutlined, ProfileOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

export const NAV_ITEMS = [
    {
        label: <Link to={'/'}>RESUME</Link>,
        key: '#/',
        icon: <ProfileOutlined/>,
    },
    {
        label: "DEMO",
        key: "demo",
        icon: <ProfileOutlined/>,
        type: 'group',
        children: [
            {
                label: <Link to={'demo/todo'}>To Do</Link>,
                key: '#/demo/todo',
                icon: <CalendarOutlined/>
            },
            {
                label: 'Simple Quiz',
                key: 'simple-quiz',
                disabled: true,
                // icon: <CalendarOutlined/>
            },
            {
                label: 'Timed Quiz',
                key: 'timed-quiz',
                disabled: true,
                // icon: <VerifiedOutlined/>
            },
            {
                label: 'Resume Maker',
                key: 'resume-maker',
                disabled: true,
                icon: <ProfileOutlined/>
            }
        ]
    },
    {
        label: <Link to={'github'}>GITHUB PROFILE</Link>,
        key: '#/github',
        disabled: true,
        icon: <GithubOutlined/>
    },
    {
        label: <Link to={'stackoverflow'}>STACKOVERFLOW</Link>,
        key: '#/stackoverflow'
    },
    {
        label: <Link to={'credits'}>Credits</Link>,
        key: '#/credits',
        icon: <CopyrightCircleOutlined/>
    }
]