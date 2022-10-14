import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchResume} from "../../rtk/resume/slices";
import {Card, Col, Divider, Row, Space, Spin, Typography} from "antd";
import Profile from "./Profile";
import Skills from "./skills";
import ExperienceList from "./ExperienceList";
import Education from "./Education";
import {GithubOutlined, HomeOutlined, LinkedinOutlined, MailOutlined, PhoneOutlined} from "@ant-design/icons";
import {StackoverflowIcon} from "../../assets/icons";
import Achievements from "./achievements";
import './resume.less';


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
        <Typography.Text strong>
            {resume.designation || 'Software Engineer & Team Lead'} <br/>
        </Typography.Text>
        <Typography.Text>
            {resume.titleExtra || 'NEC Reg: 8613 | Python | Django | React | Rest API | Regex | pandas | R'} <br/>
            <HomeOutlined/> {resume.address || 'Kathmandu, Nepal'}
        </Typography.Text>
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
                return <Space><a href={value} target={'_blank'} rel="noreferrer">{value}</a><StackoverflowIcon/></Space>
            default:
                return value
        }
    }
    const mainTitleExtra = <>
        <div style={{textAlign: 'right', gap: 0}}>
            {(Object.keys(resume.contacts || {})).map(key => <div key={key}>{getIcon(key, resume.contacts[key])}</div>)}
        </div>
    </>

//     return (
//         <Spin spinning={isResumeLoading} tip={'Hold on! Fetching Resume'}>
//             <Row style={{background: '#fff', margin: '5px'}} gutter={20}>
//                 <Col span={16}>
//                     <Card title={mainTitle} extra={mainTitleExtra}>
//                         <Divider plain>About Me</Divider>
//                         <Profile profiles={resume.profiles}/>
//                         <Divider plain>Experiences</Divider>
//                         <ExperienceList experiences={resume.experiences}/>
//                     </Card>
//                 </Col>
//                 <Col span={8}>
//                     <Skills skills={resume.skills}/>
//                     <Divider plain>Education</Divider>
//                     <Education educations={resume.educations}/>
//                 </Col>
//             </Row>
//         </Spin>
//     )
// }

    return (
        <Spin spinning={isResumeLoading} tip={'Hold on! Fetching Resume'}>
            <Card
                // style={{}}
                className={'resume-wrapper'}
                bordered={false}>
                <Row>
                    <Col md={16}>
                        <Card.Grid style={{width: '100%', padding: 0, boxShadow: "none"}} hoverable={false}>
                            <Card
                                size={'small'}
                                title={mainTitle}
                                extra={mainTitleExtra}
                                bordered={false}
                                style={{boxShadow: 'none', border: 0, background: "transparent"}}
                                headStyle={{border: 0, fontWeight: 'normal'}}/>
                            <Divider style={{marginTop: 0}}>About Me</Divider>
                            <Profile profiles={resume.profiles}/>
                            <Divider style={{marginBottom: -10}}>Experiences</Divider>
                            <ExperienceList experiences={resume.experiences}/>
                        </Card.Grid>

                    </Col>
                    <Col md={8}>
                        <Card.Grid
                            style={{width: '100%', padding: 0, boxShadow: 'none', background: 'rgb(250, 250, 250)'}}
                            hoverable={false}>
                            <Skills skills={resume.skills}/>
                            <Divider style={{marginBottom: -10}}>Education</Divider>
                            <Education educations={resume.educations}/>
                            <Divider>Achievements & Enrollments</Divider>
                            <Achievements achievements={resume.achievements}/>
                        </Card.Grid>

                    </Col>

                </Row>
            </Card>
            <div className={'footer-div-for-print'}>https://bkhyat.github.io | {Date().toLocaleString()}</div>
        </Spin>
    )
}

export default Resume;