import {Button, DatePicker, Form, Input, TimePicker} from "antd";
import {useForm} from "antd/es/form/Form";
import {useDispatch} from "react-redux";
import {enterLog} from "../../rtk/timeLogger/slices";
import {ArrowRightOutlined} from "@ant-design/icons";

const dateFormat = "YYYY-MM-DD"
const timeFormat = 'HH:mm'
const NewTimeLogger = () => {
    const [form] = useForm()
    const dispatch = useDispatch();
    const onFinish = (values) => {
        const {times, date, ...data} = values

        data['start'] = times[0].format(timeFormat)
        data['end'] = times[1].format(timeFormat)
        data['date'] = date.format(dateFormat)
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
                <DatePicker format={dateFormat}/>
            </Form.Item>
            <Form.Item label={"Times"} name={'times'}
                       rules={[{required: true, message: "Times can not be empty"}]}
            >
                <TimePicker.RangePicker format={timeFormat}/>
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