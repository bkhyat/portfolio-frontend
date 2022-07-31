import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {changeCurrentTag, fetchTopTags} from "../../rtk/stackoverflow/slices";
import {Col, Row, Tabs} from "antd";
import TopAnswersByTag from "./topAnswersByTag";


const TopTags = () => {
    const {isLoading, data} = useSelector(state => state.stackoverflow.topTags)
    const {currentTag} = useSelector(state => state.stackoverflow.topAnswersByTag)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTopTags())
    }, [])

    const onTagClick = (tag) => {
        dispatch(changeCurrentTag({tag}))
    }

    const getPopContent = ({answer_count, answer_score, question_count, question_score}) => {
        return (
            <>
                <Row gutter={20}>
                    <Col>
                        Type<br/>
                        Question<br/>
                        Answer<br/>
                        Total
                    </Col>
                    <Col>
                        Count<br/>
                        {question_count}<br/>
                        {answer_count}<br/>
                        {question_count + answer_count}
                    </Col>
                    Score<br/>
                    {question_score}<br/>
                    {answer_score}<br/>
                    {question_score + answer_score}
                </Row>
            </>
        )
    }

    return (
        <div>
            <Tabs onChange={onTagClick} active={currentTag} size={'small'} tabBarGutter={25}>
                {data.map(item => (
                    <Tabs.TabPane key={item.tag_name} tab={item.tag_name}>
                        {/*<TopAnswersByTag />*/}
                    </Tabs.TabPane>
                ))}
            </Tabs>

            <TopAnswersByTag/>
        </div>
    )
}

export default TopTags;