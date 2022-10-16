import {Button, DatePicker, Form, Input, TimePicker} from "antd";
import {useForm} from "antd/es/form/Form";
import {useDispatch} from "react-redux";
import {enterLog} from "../../rtk/timeLogger/slices";
import {ArrowRightOutlined} from "@ant-design/icons";
import {DATE_FORMAT, TIME_FORMAT} from "../constants";


const NewTimeLogger = () => {
    const [form] = useForm()
    const dispatch = useDispatch();
    const onFinish = (values) => {
        const {times, date, ...data} = values

        data['start'] = times[0].format(TIME_FORMAT)
        data['end'] = times[1].format(TIME_FORMAT)
        data['date'] = date.format(DATE_FORMAT)
        dispatch(enterLog(data))
        // form.resetFields()
    }

    return (
        <Form
            layout={'vertical'}
            size={'small'}
            onFinish={onFinish}
            form={form}>
            <Form.Item label={"Date"} name={'date'}>
                <DatePicker format={DATE_FORMAT}/>
            </Form.Item>
            <Form.Item label={"Times"} name={'times'}
                       rules={[{required: true, message: "Times can not be empty"}]}
            >
                <TimePicker.RangePicker format={TIME_FORMAT}/>
            </Form.Item>
            <Form.Item label={"Description"} name={'description'}
                       rules={[{required: true, message: "Description can not be empty"}]}>
                <Input.TextArea showCount rows={5}/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 11}}>
                <Button htmlType={'submit'} type={'primary'} icon={<ArrowRightOutlined/>}>Enter</Button>
            </Form.Item>

        </Form>)
}

export default NewTimeLogger;