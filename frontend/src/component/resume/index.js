import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchResume} from "../../rtk/resume/slices";
import {Card, Divider, Spin, Typography} from "antd";
import Profile from "./Profile";
import Skills from "./skills";
import ExperienceList from "./ExperienceList";


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

    const mainTitleExtra = <>
        <Typography.Paragraph style={{textAlign: 'right'}}>
            {(Object.keys(resume.contacts || {})).map(key => <>{resume.contacts[key]}<br/></>)}
        </Typography.Paragraph>
    </>

    return (
        <Spin spinning={isResumeLoading}>
            <Card>
                <Card.Grid style={{width: '70%'}} hoverable={false}>
                    <Card title={mainTitle} extra={mainTitleExtra}/>
                    <Divider plain style={{fontWeight: 'bold'}}>About Me</Divider>
                    <Profile profiles={resume.profiles}/>
                    <Divider plain style={{fontWeight: 'bold'}}>Experiences</Divider>
                    <ExperienceList experiences={resume.experiences}/>
                </Card.Grid>
                <Card.Grid style={{width: '30%'}} hoverable={false}>
                    <Skills skills={resume.skills}/>
                </Card.Grid>
            </Card>
        </Spin>
    )
}

export default Resume;