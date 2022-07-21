import {Divider, Space, Tag, Typography} from "antd";


const Skills = ({skills}) => {

    return (
        <>
            <Divider plain style={{fontWeight: 'bold'}}>
                Skills
            </Divider>
            <Divider orientation={'left'} plain style={{fontWeight: 'bold'}} orientationMargin={0}>
                Soft
            </Divider>
            <ul>
                {skills.soft_skills.map(item => <li>{item}</li>)}
            </ul>
            <Divider orientation={'left'} plain style={{fontWeight: 'bold'}} orientationMargin={0}>
                Technical
            </Divider>
            <ul>
                <Space direction={'vertical'}>
                    {Object.keys(skills.tech_skills).map(key => <li>
                        <Typography.Text strong>{key}</Typography.Text> <br/>
                        {/*<ul>*/}
                        <Space size={skills.tech_skills[key].map(() => 1)} wrap>{skills.tech_skills[key].map(item =>
                            <Tag>{item?.name}</Tag>)}</Space>
                        {/*</ul>*/}
                    </li>)}
                </Space>
            </ul>
        </>
    )
}

export default Skills;