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
                        console.log(resp.data)
                        notification.success('Todo updated successfully', 3)
                        toggleVisible();
                    }
                )
                .catch(error => {
                    notification.error("Error updating todo, try again!", 3)
                })
                .finally(() => setPushingData(false))
        } else {
            axios.post(todosURL, values.todos)
                .then(resp => {
                    notification.success('New todo created successfully!', 3)
                    toggleVisible();
                })
                .catch(
                    err => {
                        console.log(err)
                        notification.error("An error occurred while creating new todo, try again!", 3)
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