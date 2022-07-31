import {createElement, useEffect} from "react";
import {Divider, Drawer, List, Skeleton, Space, Tag, Typography} from "antd";
import {
    ArrowUpOutlined,
    BarsOutlined,
    CommentOutlined,
    EditOutlined,
    EyeOutlined,
    FormOutlined,
    TagsOutlined
} from "@ant-design/icons";
import MarkdownComponent from "./markdownComponent";
import {useDispatch, useSelector} from "react-redux";
import {changeSelectedQuestion, toggleQuestionModalVisible} from "../../rtk/stackoverflow/slices";


const IconText = ({icon, text}) => (
    <Space>
        {createElement(icon)}
        {text || 0}
    </Space>
)


const Answer = ({answer}) => {

    return <>
        <hr/>
        <Typography.Text strong>Answer:</Typography.Text>
        < hr/>
        <Space split={<Divider type={'vertical'}/>}>
            <IconText icon={ArrowUpOutlined} text={answer.score}/>
            <IconText icon={FormOutlined} text={new Date(answer.creation_date * 1000).toLocaleString()}/>
            <IconText icon={EditOutlined} text={new Date(answer.last_edit_date * 1000).toLocaleString()}/>
        </Space>
        <MarkdownComponent text={answer?.body_markdown}/>
    </>
}

export const QuestionModal = () => {
    const {
        question, answer, isVisible,
        placement
    } = useSelector(state => state.stackoverflow.questionModal)
    const dispatch = useDispatch()
    const toggleVisibility = () => dispatch(toggleQuestionModalVisible())

    return <Drawer
        placement={placement}
        width={700}
        visible={isVisible}
        title={
            <Space direction={'vertical'}>
                <Typography.Text strong>Q. {question.title}</Typography.Text>
                <Space><TagsOutlined style={{color: 'gray'}}/> {question?.tags?.map(item => <Tag>{item}</Tag>)} </Space>
                <Space split={<Divider type="vertical"/>}>
                    <IconText icon={ArrowUpOutlined} text={question.up_vote_count}/>
                    <IconText icon={EyeOutlined} text={question.view_count}/>
                    <IconText icon={BarsOutlined} text={question.answer_count}/>
                    <IconText icon={CommentOutlined} text={question.comment_count}/>
                    <IconText icon={FormOutlined} text={new Date(question.creation_date * 1000).toLocaleString()}/>
                </Space>
            </Space>}
        onClose={toggleVisibility}>
        <Space direction={'vertical'}>
            <MarkdownComponent text={question.body_markdown}/>
        </Space>
        {Boolean(answer?.body_markdown) && <Answer answer={answer}/>}
    </Drawer>
}


export const Questions = ({questions, answers, isLoading}) => {
    const {question, isVisible} = useSelector(state => state.stackoverflow.questionModal)
    const dispatch = useDispatch();

    const toggleVisibility = () => dispatch(toggleQuestionModalVisible())

    const onSelectedQuestionChange = (question) => {
        const answer = answers?.filter(item => item.question_id === question.question_id)
        dispatch(changeSelectedQuestion({question, answer: answer?.length === 1 ? answer[0] : {}}))
    }

    useEffect(() => {
        if (Object.keys(question || {}).length > 0) {
            toggleVisibility()
        }
    }, [question])

    useEffect(() => {
        if (!isVisible) {
            dispatch(changeSelectedQuestion({question: {}, answer: {}}))
        }
    }, [isVisible])

    return <Skeleton loading={isLoading} active>
        <List
            size={'small'}
            itemLayout="vertical"
            dataSource={questions}
            renderItem={item => (
                <List.Item
                    extra={<Typography.Link onClick={() => onSelectedQuestionChange(item)}
                                            style={{cursor: 'pointer'}}>View</Typography.Link>}
                    actions={[
                        <IconText icon={ArrowUpOutlined} text={item.up_vote_count}/>,
                        <IconText icon={EyeOutlined} text={item.view_count}/>,
                        <IconText icon={BarsOutlined} text={item.answer_count}/>,
                        <IconText icon={CommentOutlined} text={item.comment_count}/>
                    ]}
                    key={item.question_id}>
                    <List.Item.Meta
                        title={item.title}
                        description={<Space><TagsOutlined/> {item.tags.map(item => <Tag>{item}</Tag>)} </Space>}
                    />
                </List.Item>
            )}
        >
        </List>
    </Skeleton>
}

export default Questions;