import {useEffect, useState} from "react";
import axios from "axios";
import {Card, Col, Divider, message, Row, Spin, Typography} from "antd";
import TodoModal from "./TodoModal";
import TodoItem from "./TodoItem";


const Todo = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [todos, setTodos] = useState({})
    const [currentTodo, setCurrentTodo] = useState([])
    const [fetching, setFetching] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible)

    useEffect(() => {
        setFetching(true)
        axios.get(process.env.REACT_APP_API_BASE_URL + '/todo/v1/todos/', {timeout: 3000})
            .then(resp => {
                const complete = []
                const pending = []
                resp.data.forEach(todo => {
                    if (todo.is_completed) {
                        complete.push(todo)
                    } else {
                        pending.push(todo)
                    }
                    setTodos({complete, pending})
                })
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
            <Card>
                <Divider>Todo List</Divider>
                <Row gutter={12} style={{height: '100vh'}}>
                    <Col span={12}>
                        <Card title={"Pending Todos"} extra={<Typography.Link onClick={() => {
                            setCurrentTodo([])
                            toggleVisibility()
                        }}>Add More Todo...</Typography.Link>}>
                            {todos.pending?.map(todo => <TodoItem todo={todo} onEditTodo={onEditTodo}/>)}
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title={"Completed Todos"}>
                            {todos.complete?.map(todo => <TodoItem todo={todo} onEditTodo={onEditTodo}/>)}
                        </Card>
                    </Col>
                </Row>
            </Card>
            {currentTodo && isVisible && <TodoModal
                isVisible={isVisible}
                toggleVisible={toggleVisibility}
                todo={currentTodo}
            />}
        </Spin>
    )

}
export default Todo;