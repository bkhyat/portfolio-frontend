import {Card, Typography} from "antd";

const EducationItem = ({education}) => {
    const titleLeft = <>
        <Typography.Text strong>
            {education.level} | {education.course}
        </Typography.Text>
        <Typography.Paragraph italic>
            {education.university} <br/>
            {education.school}
        </Typography.Paragraph></>

    const titleExtra = <>
        <Typography.Text strong>
            {new Date(education.end_date).getFullYear()}
        </Typography.Text>
        <Typography.Paragraph italic>
            {education.score}
        </Typography.Paragraph></>
    return (
        <Card
            title={titleLeft}
            extra={titleExtra}
            headStyle={{fontWeight: 'normal', fontSize: '14px'}}
            style={{width: '100%'}}
        />
    )

}

const Education = ({educations}) => {

    return <>
        {(educations || []).map(education => <EducationItem education={education}/>)}
    </>

}
export default Education;