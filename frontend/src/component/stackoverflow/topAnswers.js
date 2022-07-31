import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchTopAnswers} from "../../rtk/stackoverflow/slices";
import Questions from "./questions";


const TopAnswers = () => {
    const {questions, answers, isLoading} = useSelector(state => state.stackoverflow.topAnswers)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTopAnswers())
    }, [])
    return <div>
        <Questions questions={questions} answers={answers} isLoading={isLoading}/>
    </div>
}

export default TopAnswers;