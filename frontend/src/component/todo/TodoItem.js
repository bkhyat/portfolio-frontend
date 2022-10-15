import {Badge, Card, Checkbox, Divider, Modal, notification, Space} from "antd";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, LoadingOutlined} from "@ant-design/icons";
import axios from "../../axiosConfig";
import {useState} from "react";

const {confirm} = Modal

const CompleteToggle = ({is_complete, id}) => {
    const [isComplete, setIsComplete] = useState(is_complete)
    const [loading, setLoading] = useState(false)
    const toggleComplete = () => {
        setLoading(true)
        axios.patch(`${process.env.REACT_APP_API_BASE_URL}/todo/v1/todos/${id}/`, {is_completed: !is_complete})
            .then(resp => {
                setIsComplete(resp.data.is_completed)
            })
            .catch(err => {
                console.log(err)
                notification.error("An error occurred! Try again later.", 3)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return <>
        {loading ? <LoadingOutlined/> : <Checkbox defaultChecked={isComplete} onChange={toggleComplete}
                                                  loading={true}>
            {is_complete ? 'Mark Incomplete' : 'Mark Complete'}
        </Checkbox>
        }
    </>
}

const EditOption = ({id, onEditClick}) => {
    return <span onClick={() => onEditClick(id)} style={{cursor: 'pointer'}}><EditOutlined/> Edit</span>
}

const showDeleteConfirm = (id) => {
    confirm({
        title: "Delete Todo",
        icon: <ExclamationCircleOutlined/>,
        content: 'Are you sure you want to delete the todo?',
        onOk() {
            return axios.delete(process.env.REACT_APP_API_BASE_URL + '/todo/v1/todos/' + id)
                .then(resp => {
                    notification.success("Todo Deleted Successfully!", 3)
                })
                .catch(error => {
                    console.log(error)
                    notification.error("Could not delete at the moment! Try again later", 3)
                })
        },
        onCancel() {
        },
    })
}


const DeleteOption = ({id}) => {
    return <span onClick={() => showDeleteConfirm(id)} style={{color: 'red', cursor: 'pointer'}}><DeleteOutlined/> Delete</span>
}

const TodoItem = ({todo, onEditTodo}) => {
    const getRibbonProps = () => {
        const props = {}
        if (todo.is_completed) {
            props['text'] = `Completed at: ${new Date(todo.completed_at || todo.updated_at).toLocaleString()}`
        } else {
            if (todo.created_at === todo.updated_at) {
                props['text'] = `Created at: ${new Date(todo.created_at).toLocaleString()}`
                props['color'] = 'blue'
            } else {
                props['text'] = `Last Modified: ${new Date(todo.updated_at).toLocaleString()}`
                props['color'] = 'purple'
            }
        }
        return props
    }
    return (
        <Badge.Ribbon {...getRibbonProps()}>
            <Card title={todo.title}>
                <Space direction={'vertical'}>
                    {todo.description}
                    <Space split={<Divider type="vertical"/>}>
                        <EditOption onEditClick={onEditTodo} id={todo.id}/>
                        <CompleteToggle is_complete={todo.is_completed} id={todo.id}/>
                        <DeleteOption id={todo.id}/>
                    </Space>
                </Space>
            </Card>
        </Badge.Ribbon>
    )
}

export default TodoItem;