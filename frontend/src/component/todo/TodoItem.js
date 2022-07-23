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
    return (
        <Badge.Ribbon>
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