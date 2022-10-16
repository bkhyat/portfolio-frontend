import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchWeeklyLogs} from "../../rtk/timeLogger/slices";
import {convertMinutesToTime} from "../../utils";


const WeeklyLogs = () => {
    const {weeklyLogs} = useSelector(state => state.timeLogger)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchWeeklyLogs())
    }, [])

    return <div>
        <Table
            pagination={false}
            size={'small'}
            columns={[
                {
                    key: 'day',
                    dataIndex: 'day',
                    title: 'Day'
                },
                {
                    key: 'prevWeek',
                    dataIndex: 'prevWeek',
                    title: 'Previous Week',
                    render: (val) => convertMinutesToTime(Number(val))
                },
                {
                    key: 'thisWeek',
                    dataIndex: 'thisWeek',
                    title: 'This Week',
                    render: (val) => convertMinutesToTime(Number(val))
                }
            ]}
            dataSource={weeklyLogs}
            summary={() => (
                <Table.Summary fixed>
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>Total Logged</Table.Summary.Cell>
                        <Table.Summary.Cell
                            index={1}>{convertMinutesToTime(weeklyLogs.map((item => item.prevWeek)).reduce((a, b) => a + b, 0))}</Table.Summary.Cell>
                        <Table.Summary.Cell
                            index={2}>{convertMinutesToTime(weeklyLogs.map((item => item.thisWeek)).reduce((a, b) => a + b, 0))}</Table.Summary.Cell>
                    </Table.Summary.Row>
                </Table.Summary>
            )}
        />
    </div>
}

export default WeeklyLogs;