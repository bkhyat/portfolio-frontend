import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchResume} from "../../rtk/resume/slices";
import {Card, Divider, Space, Spin, Typography} from "antd";
import Profile from "./Profile";
import Skills from "./skills";
import ExperienceList from "./ExperienceList";
import Education from "./Education";
import {GithubOutlined, LinkedinOutlined, MailOutlined, PhoneOutlined} from "@ant-design/icons";


const Resume = () => {
    const {isResumeLoading, ...resume} = useSelector(state => state.resume)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchResume())
    }, [])

    const mainTitle = <>
        <Typography.Title level={3} style={{color: '#bf58bf'}}>
            {`${resume.first_name || 'Er. Bikhyat'} ${resume.last_name || 'Adhikari'}`}
        </Typography.Title>
        <Typography.Paragraph strong>
            {resume.designation || 'Software Engineer & Team Lead'} <br/>
            {resume.address || 'Kathmandu, Nepal'}
        </Typography.Paragraph>
    </>

    const getIcon = (icon, value) => {
        switch (icon) {
            case "Mobile":
                return <Space>{value} <PhoneOutlined/></Space>
            case "Email":
                return <Space>{value} <MailOutlined/></Space>
            case "LinkedIn":
                return <Space><a href={value} target={'_blank'} rel="noreferrer">{value}</a><LinkedinOutlined/></Space>
            case "GitHub":
                return <Space><a href={value} target={'_blank'} rel="noreferrer">{value}</a><GithubOutlined/></Space>
            case "StackOverflow":
                return <a href={value} target={'_blank'} rel="noreferrer">{value}</a>
            default:
                return value
        }
    }
    const mainTitleExtra = <>
        {/*<Typography.Paragraph style={{textAlign: 'right'}}>*/}
        <Space direction={'vertical'} style={{textAlign: 'right'}}>
            {(Object.keys(resume.contacts || {})).map(key => <div key={key}>{getIcon(key, resume.contacts[key])}</div>)}
        </Space>
        {/*</Typography.Paragraph>*/}
    </>

    return (
        <Spin spinning={isResumeLoading} tip={'Hold on! Fetching Resume'}>
            <Card>
                <Card.Grid style={{width: '70%'}} hoverable={false}>
                    <Card title={mainTitle} extra={mainTitleExtra}/>
                    <Divider plain>About Me</Divider>
                    <Profile profiles={resume.profiles}/>
                    <Divider plain>Experiences</Divider>
                    <ExperienceList experiences={resume.experiences}/>
                </Card.Grid>
                <Card.Grid style={{width: '30%'}} hoverable={false}>
                    <Skills skills={resume.skills}/>
                    <Divider plain>Education</Divider>
                    <Education educations={resume.educations}/>
                </Card.Grid>
            </Card>
        </Spin>
    )
}

export default Resume;