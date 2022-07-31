import {Avatar, Card, Col, Divider, Row, Space, Spin, Statistic} from "antd";
import TopTags from "./topTags";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchUserDetail} from "../../rtk/stackoverflow/slices";
import {TrophyOutlined} from "@ant-design/icons";
import TopQuestions from "./topQuestions";
import TopAnswers from "./topAnswers";
import {QuestionModal} from "./questions";


const Stackoverflow = () => {
    const {badge_counts, isLoading, ...profileData} = useSelector(state => state.stackoverflow.userDetail)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserDetail())
    }, [])
    return <Spin spinning={isLoading}>
        <Card>
            <Row gutter={24}>
                <Col span={13}>

                    <Card title={"Profile Overview"}
                          extra={<a href={"https://stackoverflow.com/users/9136348/thepyguy?t"} target={"_blank"}
                                    rel="noreferrer">View on Stackoverflow</a>}>
                        <Card.Meta
                            avatar={<Avatar src={profileData?.profile_image}/>}
                            title={profileData.display_name}
                            description={<Space><TrophyOutlined style={{color: 'gold'}}/>{badge_counts?.gold}
                                <TrophyOutlined style={{color: 'silver'}}/>{badge_counts?.silver}
                                <TrophyOutlined style={{color: 'brown'}}/>{badge_counts?.bronze}</Space>}
                        />
                        <br/>
                        <Row>
                            <Col span={12}>
                                <Statistic title={"Questions Answered"} value={profileData?.answer_count}/>
                            </Col>
                            <Col span={12}>
                                <Statistic title={"Questions Asked"} value={profileData?.question_count}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Statistic title={"Reputations"} value={profileData?.reputation}/>
                            </Col>
                            <Col span={12}>
                                <Statistic
                                    title={"Badge Counts"}
                                    value={(badge_counts?.gold || 0) + (badge_counts?.silver || 0) + (badge_counts?.bronze || 0)}
                                />
                            </Col>
                        </Row>

                        <Divider>Top Tags & Answers</Divider>
                        <TopTags/>
                    </Card>
                </Col>
                <Col span={11}>
                    <Card>
                        <Divider>Top Questions</Divider>
                        <TopQuestions/>
                        <Divider>Top Answers</Divider>
                        <TopAnswers/>
                    </Card></Col>
            </Row>
        </Card>
        <QuestionModal/>
    </Spin>
}

export default Stackoverflow;