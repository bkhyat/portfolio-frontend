import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchAnswersByTag} from "../../rtk/stackoverflow/slices";
import Questions from "./questions.js";

const TopAnswersByTag = () => {
    const {answers, questions, currentTag, isLoading} = useSelector(state => state.stackoverflow.topAnswersByTag)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAnswersByTag({tag: currentTag}))
    }, [currentTag])

    return <Questions
        questions={questions[currentTag]}
        answers={answers[currentTag]}
        isLoading={isLoading}
        placement={'right'}
    />
}

export default TopAnswersByTag;