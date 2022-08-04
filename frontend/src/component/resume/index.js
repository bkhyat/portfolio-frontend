import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchResume} from "../../rtk/resume/slices";
import {Card, Divider, Space, Spin, Typography} from "antd";
import Profile from "./Profile";
import Skills from "./skills";
import ExperienceList from "./ExperienceList";
import Education from "./Education";
import {GithubOutlined, LinkedinOutlined, MailOutlined, PhoneOutlined} from "@ant-design/icons";
import {StackoverflowIcon} from "../../assets/icons";


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
            {resume.address || 'Kathmandu, Nepal'}
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
        {/*<Typography.Paragraph style={{textAlign: 'right'}}>*/}
        <div style={{textAlign: 'right', gap: 0}}>
            {(Object.keys(resume.contacts || {})).map(key => <div key={key}>{getIcon(key, resume.contacts[key])}</div>)}
        </div>
        {/*</Typography.Paragraph>*/}
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
            <Card style={{margin: '15px 5px 1px 1px ', border: '1px solid rgb(240, 240, 240)'}} bordered={false}>
                <Card.Grid style={{width: '70%', padding: 0, boxShadow: "none"}} hoverable={false}>
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
                <Card.Grid
                    style={{width: '30%', padding: 0, boxShadow: 'none', background: 'rgb(250, 250, 250)'}}
                    hoverable={false}>
                    <Skills skills={resume.skills}/>
                    <Divider style={{marginBottom: -10}}>Education</Divider>
                    <Education educations={resume.educations}/>
                </Card.Grid>
            </Card>
        </Spin>
    )
}

export default Resume;