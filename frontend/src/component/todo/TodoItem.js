import {Badge, Card, Checkbox, message, Space, Typography} from "antd";
import {EditOutlined, LoadingOutlined} from "@ant-design/icons";
import axios from "axios";
import {useState} from "react";

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
                message.error("An error occurred! Try again later.")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return <Space>
        <Typography.Link onClick={toggleComplete}>
            {loading ? <LoadingOutlined/> : <Checkbox defaultChecked={isComplete} onChange={toggleComplete}
                                                      loading={true}/>}{is_complete ? 'Mark Incomplete' : 'Mark Complete'}
        </Typography.Link>
    </Space>
}

const EditOption = ({id, onEditClick}) => {
    return <Space>
        <Typography.Link onClick={() => onEditClick(id)}><EditOutlined/> Edit</Typography.Link>
    </Space>
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
                    <Space>
                        <EditOption onEditClick={onEditTodo} id={todo.id}/>
                        <CompleteToggle is_complete={todo.is_completed} id={todo.id}/>
                    </Space>
                </Space>
            </Card>
        </Badge.Ribbon>
    )
}

export default TodoItem;