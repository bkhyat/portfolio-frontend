import {CalendarOutlined, ControlOutlined, GithubOutlined, ProfileOutlined, VerifiedOutlined} from "@ant-design/icons";

export const NAV_ITEMS = [
    {
        label: "RESUME",
        key: "resume",
        icon: <ProfileOutlined/>,
        type: 'group',
        children: [
            {
                label: 'Profile',
                key: 'profile',
                icon: <CalendarOutlined/>
            },
            {
                label: 'Experience',
                key: 'experience',
                icon: <CalendarOutlined/>
            },
            {
                label: 'Education',
                key: 'education',
                icon: <VerifiedOutlined/>
            },
            {
                label: 'Skills',
                key: 'skills',
                icon: <ControlOutlined/>
            }
        ]
    },
    {
        label: "DEMO",
        key: "demo",
        icon: <ProfileOutlined/>,
        type: 'group',
        children: [
            {
                label: 'To Do',
                key: 'to-do',
                // icon: <CalendarOutlined/>
            },
            {
                label: 'Simple Quiz',
                key: 'simple-quiz',
                // icon: <CalendarOutlined/>
            },
            {
                label: 'Timed Quiz',
                key: 'timed-quiz',
                // icon: <VerifiedOutlined/>
            },
            {
                label: 'Resume Maker',
                key: 'resume-maker',
                icon: <ProfileOutlined/>
            }
        ]
    },
    {
        label: 'GITHUB PROFILE',
        key: 'github-profile',
        icon: <GithubOutlined/>
    },
    {
        label: 'STACKOVERFLOW',
        key: 'stackoverflow'
    }
]