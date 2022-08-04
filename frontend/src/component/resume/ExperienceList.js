import {Card, Space, Tag, Typography} from "antd";

const montNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const Experience = ({experience}) => {
    const parseDate = date => {
        if (!date) return 'Present'
        const dateObj = new Date(date)
        return `${montNames[dateObj.getMonth()]} ${dateObj.getFullYear()}`
    }

    const getDuration = (start, end) => {
        const date1Obj = new Date(start)
        let date2Obj, presentFlag
        if (!end) {
            date2Obj = new Date()
            presentFlag = true
        } else {
            date2Obj = new Date(end)
        }
        const diff = (date2Obj - date1Obj) / (86400 * 1000 * 30)
        const years = diff / 12
        const wholeYears = Math.trunc(years)
        const wholeMonths = Math.trunc((years - wholeYears) * 12)

        let value = ''
        if (wholeYears) {
            value += wholeYears + " Year" + (years > 1 ? 's' : '')
        }
        if (wholeMonths || presentFlag) {
            value += " "
                + (wholeMonths === 0 ? 1 : wholeMonths)
                + " Month" + (wholeMonths > 1 ? 's' : '')
                + (presentFlag ? "+" : "")
        }

        return value
    }
    const titleLeft = <Typography.Paragraph style={{margin: 0}}>
        <Typography.Text strong> {experience.designation} </Typography.Text> <br/>
        <Typography.Text italic>{experience.organization}</Typography.Text>
    </Typography.Paragraph>
    const titleRight = <Typography.Paragraph style={{textAlign: 'right', margin: 0}}>
        <Typography.Text
            strong>{parseDate(experience.start_date)} - {parseDate(experience.end_date)}</Typography.Text> <br/>
        <Typography.Text italic> {getDuration(experience.start_date, experience.end_date)}</Typography.Text>
    </Typography.Paragraph>


    return (
        <Card
            title={titleLeft}
            extra={titleRight}
            style={{width: '100%', background: 'transparent'}}
            size={'small'}
            headStyle={{fontWeight: 'normal'}}
            bordered={false}
            bodyStyle={{borderBottom: '1px solid #f0f0f0'}}
        >
            <Card.Grid style={{width: '70%', padding: '12px 6px 6px 0', boxShadow: 'none'}} hoverable={false}>
                <ul style={{textAlign: 'justify'}}>{experience.bullets.map((item, index) => <li
                    key={index}>{item}</li>)}</ul>

            </Card.Grid>
            <Card.Grid style={{width: '30%', padding: '12px 6px 6px 6px', boxShadow: 'none'}} hoverable={false}>
                <Space direction={'vertical'}>
                    <Typography.Text strong>Relevant Skills:</Typography.Text>
                    <Space wrap style={{gap: 8}}>{experience.skills.map((item, index) => <Tag
                        key={index}>{item}</Tag>)}</Space>
                </Space>
            </Card.Grid>
        </Card>
    )
}
const ExperienceList = ({experiences}) => {

    return (
        <>
            {experiences.map((experience, index) => (
                <Experience experience={experience} key={index}/>
            ))}
        </>
    )
}

export default ExperienceList;