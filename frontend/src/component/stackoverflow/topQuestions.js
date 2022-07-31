import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchTopQuestions} from "../../rtk/stackoverflow/slices";
import Questions from "./questions.js";


const TopQuestions = () => {
    const {questions, isLoading} = useSelector(state => state.stackoverflow.topQuestions)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTopQuestions())
    }, [])

    return <Questions questions={questions} isLoading={isLoading}/>
}
export default TopQuestions;