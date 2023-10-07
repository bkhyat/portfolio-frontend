import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "../../../axiosConfig";
import vocabServices from "../../../rtk/vocab_/services";
import {Button, Col, Row} from "antd";
import {FastBackwardOutlined, FastForwardOutlined} from "@ant-design/icons";
import WordMeaning from "../wordMeaning/WordMeaning";
import {fetchWordMeaning, setCurrentIndex} from "../../../rtk/vocab_/slices";

const Practice = () => {
    // const [practiceSet, setPracticeSet] = useState([]);
    // const [currentIndex, setCurrentIndex] = useState();
    const {practiceSet, meanings} = useSelector(state => state.vocab)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchWordMeaning(practiceSet?.[practiceSet.currentPage]?.[practiceSet.currentIndex]))

    }, [practiceSet.currentIndex])

    // useEffect(async () => {
    //         const arr = []
    //         const words = await axios.get("http://localhost:8000/api/vocabs/v1/words/")
    //         for (let i = 0; i < words.data.results.length; i++) { //words.data.results.length
    //             const meaning = await vocabServices.fetchMeaning(words.data.results[i].word)
    //             if (meaning?.data?.title !== "No Definitions Found") {
    //                 arr.push(meaning.data)
    //             }
    //         }
    //         setPracticeSet(arr)
    //         setCurrentIndex(0)
    //     }
    //     , [])
    // console.log(practiceSet)
    return (
        <Row gutter={8}>
            <Col span={6} style={{textAlign: "right"}}>
                {practiceSet.currentIndex > 0 ?
                    <Button
                        icon={<FastBackwardOutlined/>} style={{top: "50%"}}
                        onClick={() => setCurrentIndex(currentIndex => currentIndex - 1)}>
                        {practiceSet?.[practiceSet.currentPage][practiceSet.currentIndex - 1]?.[0]?.word}
                    </Button>
                    : ""
                }
            </Col>
            <Col span={12}>
                {practiceSet?.[practiceSet.currentPage]?.map(wordMeaning => <WordMeaning wordMeaning={wordMeaning}/>)}
            </Col>
            <Col style={{textAlign: "left"}}>
                {practiceSet.currentIndex < practiceSet[practiceSet.currentPage]?.length - 1 ?
                    <Button icon={<FastForwardOutlined/>} style={{top: "50%"}}
                            onClick={() => {
                                dispatch(setCurrentIndex(practiceSet.currentIndex + 1))
                            }}>
                        {practiceSet?.[practiceSet.currentPage][practiceSet.currentIndex + 1]?.[0]?.word}
                    </Button>
                    :
                    ""
                }

            </Col>
        </Row>
    )
}
export default Practice;