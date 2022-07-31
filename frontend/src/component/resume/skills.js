import {Divider, Space, Tag, Typography} from "antd";


const Skills = ({skills}) => {

    return (
        <>
            <Divider plain>
                Skills
            </Divider>
            <Divider orientation={'left'} plain orientationMargin={0}>
                Soft
            </Divider>
            <ul>
                {skills.soft_skills.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
            <Divider orientation={'left'} plain orientationMargin={0}>
                Technical
            </Divider>
            <ul>
                <Space direction={'vertical'}>
                    {Object.keys(skills.tech_skills).map(key => <li key={key}>
                        <Typography.Text strong>{key}</Typography.Text> <br/>
                        {/*<ul>*/}
                        <Space size={skills.tech_skills[key].map(() => 1)} wrap>{skills.tech_skills[key].map(item =>
                            <Tag key={item.name}>{item?.name}</Tag>)}</Space>
                        {/*</ul>*/}
                    </li>)}
                </Space>
            </ul>
        </>
    )
}

export default Skills;