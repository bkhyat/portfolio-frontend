import {CopyrightCircleOutlined, GithubOutlined, ProfileOutlined} from "@ant-design/icons";

export const NAV_ITEMS = [
    {
        label: "RESUME",
        key: "resume",
        icon: <ProfileOutlined/>,
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
    },
    {
        label: "Credits",
        key: 'credits',
        icon: <CopyrightCircleOutlined/>
    }
]