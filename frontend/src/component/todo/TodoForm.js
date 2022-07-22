import {Button, Checkbox, Form, Input} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";

const ToDoForm = ({onFinish, form, todo = []}) => {
    const editMode = todo.length === 1

    return (
        <Form
            name={'create_modify_todo'}
            onFinish={onFinish}
            initialValues={{todos: todo}}
            form={form}
            labelCol={{span: 4}}
            wrapperCol={{span: 24}}
        >
            <Form.List
                name={'todos'}
                rules={[{
                    validator: async (_, todos) => {
                        if (!todos || (todos || []).length === 0) {
                            return Promise.reject(new Error('At least one todo is required!'))
                        }
                    }
                }]}
            >
                {(fields, operation, meta) => (
                    <>
                        {fields.map(({key, name, ...restFields}) => (
                            <>
                                <Form.Item
                                    name={[name, 'title']}
                                    label={'Title'}
                                    rules={[{required: true, message: 'Title can not be empty'}]}
                                >
                                    <Input showCount maxLength={100}/>
                                </Form.Item>

                                <Form.Item name={[name, 'description']} label={'Description'}>
                                    <Input.TextArea showCount rows={5}/>
                                </Form.Item>
                                <Form.Item
                                    name={[name, 'is_completed']}
                                    wrapperCol={{offset: 4}}
                                >
                                    <Checkbox defaultChecked={false}/> Completed?
                                </Form.Item>
                                {fields.length > 1 && <Button
                                    danger
                                    onClick={() => operation.remove(name)} style={{width: '100%'}}
                                    icon={<MinusOutlined/>}
                                >
                                    Remove
                                </Button>}
                            </>
                        ))}

                        {!editMode && <Button
                            type="primary"
                            onClick={() => {
                                operation.add()
                                window.scrollTo({top: 0, behavior: 'smooth'});
                            }}
                            style={{width: '100%'}}
                            icon={<PlusOutlined/>}
                        >
                            Add More Todo
                        </Button>}
                    </>
                )}
            </Form.List>
        </Form>
    )
}

export default ToDoForm;