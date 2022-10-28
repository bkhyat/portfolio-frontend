import { Button, DatePicker, Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { DATE_FORMAT } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { filterLogs } from "../../rtk/timeLogger/slices";
import { Line, LineChart, XAxis, YAxis } from "recharts";

const FilterLogs = () => {
    const [form] = useForm();
    const dispatch = useDispatch();
    const { logs, summary } = useSelector(state => state.timeLogger.filteredLogs);

    const onFinish = values => {
        let { dates, search } = values;
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
                <DatePicker.RangePicker format={DATE_FORMAT} />
            </Form.Item>
            <Form.Item name={"search"}>
                <Input placeholder={"Search in description"} style={{ width: "400px" }} />
            </Form.Item>
            <Form.Item>
                <Button htmlType={"submit"} icon={<SearchOutlined />} type={"primary"}>Filter</Button>
            </Form.Item>
        </Form>
        <LineChart width={800} height={400} data={summary}>
            <Line dataKey={"duration_in_minutes"} />
            <YAxis />
            <XAxis dataKey={"date"} interval={1} direction={"vertical"} />
        </LineChart>
    </div>
}

export default FilterLogs;