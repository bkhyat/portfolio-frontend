import {useEffect, useState} from "react";
import axios from "axios";
import {Col, Divider, message, Row, Spin, Table} from "antd";
import frontendPackages from '../../package.json'

const Credits = () => {
    const [loading, setLoading] = useState(true);
    const [pythonLibraries, setPythonLibraries] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        setLoading(true)
        if (!fetched) {
            axios.get(process.env.REACT_APP_API_BASE_URL + '/requirements/')
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
                        dataSource={pythonLibraries}
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
        </Spin>
    )


}

export default Credits;