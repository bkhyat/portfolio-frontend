import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Row} from "antd";
import {FastBackwardOutlined, FastForwardOutlined} from "@ant-design/icons";
import WordMeaning from "../wordMeaning/WordMeaning";
import {fetchWordsInPages, fetchWordMeaning, setCurrentIndex} from "../../../rtk/vocab/slices";

const usePractice = () => {
    const {practiceSet, meanings} = useSelector(state=>state.vocab)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(practiceSet[practiceSet.selectedSet[0]], practiceSet.currentIndex)
        dispatch(fetchWordMeaning(practiceSet?.[practiceSet.selectedSet?.[0]]?.[practiceSet.currentIndex]))

    }, [practiceSet.currentIndex])

    useEffect(() => {
        const currentSet = practiceSet?.selectedSet?.[0]
        if(currentSet){
            dispatch(setCurrentIndex(0))
            dispatch(fetchWordsInPages(currentSet))
        }
    }, [JSON.stringify(practiceSet.selectedSet)])

    const onIndexChange = (index) => dispatch(setCurrentIndex(index))
    return {
        meanings,
        onIndexChange: onIndexChange,
        currentIndex: practiceSet.currentIndex,
        wordsInSet: (practiceSet?.[practiceSet?.selectedSet?.[0]] || [])
    }
}

const Practice = () => {
    const {meanings, currentIndex, wordsInSet, onIndexChange} = usePractice()

    return (
        <Row gutter={8}>
            <Col span={6} style={{textAlign: "right"}}>
                {currentIndex > 0 ?
                    <Button
                        icon={<FastBackwardOutlined/>} style={{top: "50%"}}
                        onClick={() => onIndexChange(currentIndex - 1)}>
                        {wordsInSet[currentIndex - 1]}
                    </Button>
                    : ""
                }
            </Col>
            <Col span={12}>
                {meanings?.[wordsInSet?.[currentIndex]]?.map(wordMeaning => <WordMeaning wordMeaning={wordMeaning}/>)}
            </Col>
            <Col style={{textAlign: "left"}}>
                {currentIndex < wordsInSet?.length - 1 ?
                    <Button icon={<FastForwardOutlined/>} style={{top: "50%"}}
                            onClick={() => {
                                onIndexChange(currentIndex + 1)
                            }}>
                        {wordsInSet[currentIndex + 1]}
                    </Button>
                    :
                    ""
                }

            </Col>
        </Row>
    )
}
export default Practice;