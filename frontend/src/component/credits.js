import {useEffect, useState} from "react";
import axios from "axios";
import {Col, Divider, message, Row, Space, Spin, Table, Typography} from "antd";
import frontendPackages from '../../package.json'

const Credits = () => {
    const [loading, setLoading] = useState(true);
    const [pythonLibraries, setPythonLibraries] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        setLoading(true)
        if (!fetched) {
            axios.get(process.env.REACT_APP_API_BASE_URL + '/requirements/', {timeout: 5000})
                .then(resp => {
                    setPythonLibraries(resp.data)
                    setLoading(false)
                    setFetched(true)
                })
                .catch(error => {
                    message.error("Error fetching Python Libraries", 3)
                    setLoading(false)
                    setFetched(false)
                })
        } else {
            setLoading(false)
        }
    }, [])

    return (
        <Spin spinning={loading}>
            <Row gutter={4}>
                <Col span={12}>
                    <Divider orientation={'left'}>
                        Python requirements.txt
                    </Divider>
                    <Table
                        columns={[
                            {
                                title: 'Library',
                                key: 'library',
                                dataIndex: 'library',
                                width: 200
                            },
                            {
                                title: 'Version',
                                key: 'version',
                                dataIndex: 'version',
                                width: 100
                            }
                        ]}
                        dataSource={pythonLibraries.map(item => ({...item, key: item.library}))}
                        pagination={false}
                        size={'small'}
                        scroll={{y: 500}}
                        bordered={true}
                    />
                </Col>
                <Col span={12}>
                    <Divider orientation={'left'}>
                        React package.json
                    </Divider>
                    <Table
                        columns={[
                            {
                                title: 'Library',
                                key: 'library',
                                dataIndex: 'library',
                                width: 200
                            },
                            {
                                title: 'Version',
                                key: 'version',
                                dataIndex: 'version',
                                width: 100
                            }
                        ]}
                        dataSource={Object.keys(frontendPackages.dependencies).map(key => ({
                            key,
                            library: key,
                            version: frontendPackages.dependencies[key]
                        }))}
                        pagination={false}
                        size={'small'}
                        scroll={{y: 500}}
                        bordered={true}
                    />
                </Col>
            </Row>
            <div style={{padding: '20px 80px 0px 80px',}}>
                <Typography.Paragraph italic
                                      style={{textAlign: 'justify', fontSize: '16px'}}>
                    Frontend of the project has been deployed as github page on GitHub where as the backend API has been
                    deployed at Pythonanywhere. This project is mainly intended to create my own portfolio, showcasing
                    my
                    resume, demo of some of my personal project, and my GitHub, and Stackoverflow stats.
                    Huge credit of course goes to Python, Django, Django Rest Framework, React, gh-pages and so on...
                    All the libraries/frameworks that have been used in the backend and the frontend of this application
                    have been listed above.
                    Thanks!!!
                </Typography.Paragraph>
                <Space direction={'vertical'}>
                    <Space>Frontend Source Code at:
                        <a href={'https://github.com/bkhyat/portfolio-frontend'} target={'_blank'} rel="noreferrer">
                            https://github.com/bkhyat/portfolio-frontend
                        </a>
                    </Space>
                    <Space>Backend Source Code at:
                        <a href={' https://github.com/bkhyat/portfolio-backend'} target={'_blank'} rel="noreferrer">
                            https://github.com/bkhyat/portfolio-backend
                        </a></Space>
                </Space>
            </div>
        </Spin>
    )


}

export default Credits;