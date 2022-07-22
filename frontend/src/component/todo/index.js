import {useEffect, useState} from "react";
import axios from "axios";
import {Card, Checkbox, List, message, Space, Spin, Typography} from "antd";
import {EditOutlined} from "@ant-design/icons";
import TodoModal from "./TodoModal";


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
const Todo = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [todos, setTodos] = useState([])
    const [currentTodo, setCurrentTodo] = useState([])
    const [fetching, setFetching] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible)

    useEffect(() => {
        setFetching(true)
        axios.get(process.env.REACT_APP_API_BASE_URL + '/todo/v1/todos/', {timeout: 3000})
            .then(resp => {
                setTodos(resp.data)
            })
            .catch(err => {
                message.error("Error fetching todos", 3)
            })
            .finally(() => setFetching(false))
    }, [])

    useEffect(() => {
        if (currentTodo && currentTodo.length === 1) {
            toggleVisibility()
        }
    }, [currentTodo])

    const onEditTodo = (id) => setCurrentTodo(todos.filter(item => item.id === id))

    return (
        <Spin spinning={fetching}>
            <Card title={'ToDo List'} style={{height: '100%'}}>
                <Typography.Link onClick={() => {
                    setCurrentTodo([])
                    toggleVisibility()
                }}>Create new Todo</Typography.Link>
                <List
                    bordered
                    style={{width: '100%'}}
                    size={'small'}
                    itemLayout={'vertical'}
                    pagination={false}
                data={todos}
                dataSource={todos}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        actions={[
                            <CompleteToggle is_complete={item.is_completed}/>,
                            <EditOption id={item.id} onEditClick={onEditTodo}/>
                        ]}
                    >
                        <List.Item.Meta
                            title={item.title}
                            description={`Created at: ${new Date(item.created_at).toLocaleString()} 
                    Last modified: ${new Date(item.updated_at).toLocaleString()}`}
                        />
                        {item.description}
                    </List.Item>
                )}
                />
                {currentTodo && isVisible && <TodoModal
                    isVisible={isVisible}
                    toggleVisible={toggleVisibility}
                    todo={currentTodo}
                />}
            </Card>
        </Spin>
    )

}

export default Todo;