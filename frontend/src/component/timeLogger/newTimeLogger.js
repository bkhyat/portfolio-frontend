import {Button, Form, Input} from "antd";
import {useForm} from "antd/es/form/Form";
import {useDispatch} from "react-redux";
import {enterLog} from "../../rtk/timeLogger/slices";


const NewTimeLogger = () => {
    const [form] = useForm()
    const dispatch = useDispatch();
    const onFinish = (values) => {
        dispatch(enterLog(values))
        form.resetFields()
    }

    return (
        <Form wrapperCol={{span: 24}} labelCol={{span: 6}} size={'small'} onFinish={onFinish} form={form}>
            <Form.Item label={"Date"} name={'date'}>
                <Input/>
            </Form.Item>
            <Form.Item label={"Start Time"} name={'start'}
                       rules={[{required: true, message: "Start time can not be empty"}]}>
                <Input/>
            </Form.Item>
            <Form.Item label={"End Time"} name={'end'} rules={[{required: true, message: "End time can not be empty"}]}>
                <Input/>
            </Form.Item>
            <Form.Item label={"Description"} name={'description'}
                       rules={[{required: true, message: "Description can not be empty"}]}>
                <Input.TextArea/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 11}}>
                <Button htmlType={'submit'} type={'primary'}>Enter</Button>
            </Form.Item>

        </Form>)
}

export default NewTimeLogger;