import {Button, DatePicker, Form, Input, Space, TimePicker, Typography} from "antd";
import {useForm} from "antd/es/form/Form";
import {useDispatch} from "react-redux";
import {enterLog} from "../../rtk/timeLogger/slices";
import {ArrowDownOutlined} from "@ant-design/icons";
import {DATE_FORMAT, TIME_FORMAT} from "../constants";
import moment from "moment";


const NewTimeLogger = () => {
    const [form] = useForm()
    const dispatch = useDispatch();
    const onFinish = (values) => {
        const {times, date, ...data} = values

        data['start'] = times[0].format(TIME_FORMAT)
        data['end'] = times[1].format(TIME_FORMAT)
        data['date'] = (date||moment()).format(DATE_FORMAT)
        dispatch(enterLog(data))
    }

    return (
        <Form
            layout={'vertical'}
            size={'small'}
            onFinish={onFinish}
            form={form}>
            <Form.Item name={'date'}
                       // label={"Date"}
            >
                <DatePicker format={DATE_FORMAT} defaultValue={moment()}/>
                {/*<Space>*/}
                {/*    <DatePicker format={DATE_FORMAT} defaultValue={moment()}/>*/}
                {/*    <Typography.Link onClick={() => form.setFieldsValue({date: moment()})}>*/}
                {/*        Today*/}
                {/*    </Typography.Link>*/}
                {/*</Space>*/}
            </Form.Item>
            <Form.Item name={'times'} //label={"Times"}
                       rules={[{required: true, message: "Times can not be empty"}]}
            >
                <TimePicker.RangePicker format={TIME_FORMAT}/>
            </Form.Item>
            <Form.Item name={'description'} //label={"Description"}
                       rules={[{required: true, message: "Description can not be empty"}]}>
                <Input.TextArea showCount rows={5}/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 11}}>
                <Button htmlType={'submit'} type={'primary'} icon={<ArrowDownOutlined />}>Enter</Button>
            </Form.Item>

        </Form>)
}

export default NewTimeLogger;