import {Button, DatePicker, Form, Input, Table} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useForm} from "antd/es/form/Form";
import {DATE_FORMAT} from "../constants";
import {useDispatch, useSelector} from "react-redux";
import {filterLogs, toggleFilterLoading} from "../../rtk/timeLogger/slices";
import {Line, LineChart, XAxis, YAxis} from "recharts";
import {convertMinutesToTime} from "../../utils";

const DAY_MAP = {0: "Mon", 1: "Tue", 2: "Wed", 3: "Thu", 4: "Fri", 5: "Sat", 6: "Sun"};

const FilterLogs = () => {
    const [form] = useForm();
    const dispatch = useDispatch();
    const {logs, summary, isLoading} = useSelector(state => state.timeLogger.filteredLogs);

    const onFinish = values => {
        dispatch(toggleFilterLoading())
        let {dates, search} = values;
        const queryParam = {};
        if (dates) {
            if (dates[0] === dates[1]) {
                queryParam['date'] = dates[0].format(DATE_FORMAT)
            } else {
                queryParam['start_date'] = dates[0].format(DATE_FORMAT)
                queryParam['end_date'] = dates[1].format(DATE_FORMAT)
            }
        }
        if (search) {
            queryParam['search'] = search
        }
        dispatch(filterLogs(queryParam))
    }

    return <div>
        <Form layout={'inline'} size={'small'} form={form} onFinish={onFinish}>
            <Form.Item name={"dates"}>
                <DatePicker.RangePicker format={DATE_FORMAT}/>
            </Form.Item>
            <Form.Item name={"search"}>
                <Input placeholder={"Search in description"} style={{width: "400px"}}/>
            </Form.Item>
            <Form.Item>
                <Button loading={isLoading} htmlType={"submit"} icon={<SearchOutlined/>} type={"primary"}>Filter</Button>
            </Form.Item>
        </Form>
        {/*<LineChart width={800} height={400} data={summary}>*/}
        {/*    <Line dataKey={"duration_in_minutes"} />*/}
        {/*    <YAxis />*/}
        {/*    <XAxis dataKey={"date"} interval={1} direction={"vertical"} />*/}
        {/*</LineChart>*/}
        <Table
            loading={isLoading}
            pagination={false}
            size={'small'}
            dataSource={logs}
            scroll={{y: 450}}
            footer={() =>
                <div style={{fontWeight: "bold"}}>
                    Total: {convertMinutesToTime(summary.map(item => item?.duration_in_minutes || 0).reduce((x, y) => x + y, 0))}
                </div>}
            columns={[
                {
                    key: 'date',
                    title: 'Date',
                    dataIndex: 'date',
                    width: 100
                },
                {
                    key: 'Day',
                    title: 'Day',
                    dataIndex: 'day',
                    width: 80,
                    render: (text) => DAY_MAP[text]
                },
                {
                    key: 'duration',
                    title: 'Duration Logged',
                    dataIndex: 'duration_in_minutes',
                    width: 150,
                    render: (text) => convertMinutesToTime(text)
                },{
                    key: 'description',
                    title: 'Description',
                    dataIndex: 'description',
                    // render: (text) => convertMinutesToTime(text)
                }
            ]}/>
    </div>
}

export default FilterLogs;