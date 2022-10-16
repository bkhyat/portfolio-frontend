import {Modal, notification} from "antd";
import {useForm} from "antd/es/form/Form";
import {useState} from "react";
import axios from "../../axiosConfig";
import ToDoForm from "./TodoForm";


const TodoModal = ({isVisible, toggleVisible, todo = []}) => {
    const [form] = useForm()
    const [pushingData, setPushingData] = useState(false);
    const onFinish = (values) => {
        setPushingData(true)
        const todosURL = process.env.REACT_APP_API_BASE_URL + '/todo/v1/todos/'
        if (todo.length === 1) {
            const {title, description, is_completed} = values.todos[0]
            axios.patch(todosURL + `${todo[0].id}/`, {title, description, is_completed})
                .then(
                    resp => {
                        notification.success({message: "Updated", description: 'Todo updated successfully'})
                        toggleVisible();
                    }
                )
                .catch(error => {
                    notification.error({message: "Could not update todo", description: error.message})
                })
                .finally(() => setPushingData(false))
        } else {
            axios.post(todosURL, values.todos)
                .then(resp => {
                    notification.success({message: "Todo Created", description: 'New todo created successfully!'})
                    toggleVisible();
                })
                .catch(
                    err => {
                        notification.error({
                            message: "Could not create Todo",
                            description: "An error occurred while creating new todo, try again!"
                        })
                    }
                )
                .finally(() => setPushingData(false))
        }
    }

    return (
        <Modal
            closable
            title={todo.length === 1 ? 'Update Todo' : 'Create Todos'}
            visible={isVisible}
            onCancel={toggleVisible}
            onOk={form.submit}
            okButtonProps={{loading: pushingData}}
            okText={todo.length === 1 ? 'Update' : 'Create'}
            bodyStyle={{height: '500px', overflowY: 'auto'}}
        >
            <ToDoForm form={form} onFinish={onFinish} todo={todo}/>
        </Modal>
    )
}
export default TodoModal;