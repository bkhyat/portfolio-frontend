import {Form, Input, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {login, toggleLoading, toggleLoginModalVisible} from "../../rtk/auth/slices";
import {useForm} from "antd/es/form/Form";


const Login = () => {
    const dispatch = useDispatch()
    const {isLoginModalVisible, isLoading, isLoggedIn} = useSelector(state => state.auth)
    const [formData, setFormData] = useState({username: '', password: ''})
    const [form] = useForm();

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(toggleLoginModalVisible())
            form.resetFields()
        }
    }, [isLoggedIn])

    const onFinish = (values) => {
        dispatch(toggleLoading())
        dispatch(login(values))
    }
    return <Modal
        title={"Login"}
        maskClosable={false}
        okText={'Login'}
        onOk={form.submit}
        confirmLoading={isLoading}
        onCancel={() => {
            form.resetFields()
            dispatch(toggleLoginModalVisible())
        }
        }
        closable
        visible={isLoginModalVisible}
    >
        <Form form={form} onFinish={onFinish}>
            <Form.Item label={"Username"} name={"username"}
                       rules={[{required: true, message: 'Please input your username!'}]}>
                <Input value={formData.username}
                       onChange={(e) => setFormData({...formData, username: e.target.value})}/>
            </Form.Item>
            <Form.Item label={"Password"} name={"password"}
                       rules={[{required: true, message: 'Please input your password!'}]}>
                <Input.Password value={formData.username}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}/>
            </Form.Item>
        </Form>
    </Modal>
}

export default Login;