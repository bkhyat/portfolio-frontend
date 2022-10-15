import {Table} from "antd";
import {convertMinutesToTime} from "../../utils";
import {useSelector} from "react-redux";


const LogOfTheDay = () => {
    const {isLoading, logsOfTheDay} = useSelector(state => state.timeLogger)
    return <Table
        size={'small'}
        loading={isLoading}
        columns={[
            {
                title: "Started at",
                key: "start",
                dataIndex: "start",
                width: '100px'
            },
            {
                title: "Finished at",
                key: "end",
                dataIndex: "end",
                width: '100px'
            },
            {
                title: "duration",
                key: "duration",
                dataIndex: "duration_in_minutes",
                width: '100px',
                render: (val) => convertMinutesToTime(Number(val))
            },
            {
                title: "Description",
                key: "description",
                dataIndex: "description"
            }
        ]}
        dataSource={logsOfTheDay}
        summary={() => (
            <Table.Summary fixed>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>Total Logged</Table.Summary.Cell>
                    <Table.Summary.Cell
                        index={1}>{convertMinutesToTime(logsOfTheDay.map((item => item.duration_in_minutes)).reduce((a, b) => a + b, 0))}</Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        )}
    />
}

export default LogOfTheDay;