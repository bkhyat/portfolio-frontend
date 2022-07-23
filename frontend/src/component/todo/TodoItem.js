import {Badge, Card, Checkbox, Space, Typography} from "antd";
import {EditOutlined} from "@ant-design/icons";

const CompleteToggle = ({is_complete}) => {

    return <Space>
        <Typography.Link>
            <Checkbox defaultChecked={is_complete}/> {is_complete ? 'Mark Incomplete' : 'Mark Complete'}
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
                        <CompleteToggle is_complete={todo.is_completed}/>
                    </Space>
                </Space>
            </Card>
        </Badge.Ribbon>
    )
}

export default TodoItem;