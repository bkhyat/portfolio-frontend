import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchWordsOfTheDay} from "../../rtk/vocab_/slices";
import WordMeaning from "./wordMeaning/WordMeaning";

const WordsOfTheDay = () => {
    const dispatch = useDispatch();
    const {wordOfTheDay} = useSelector(state => state.vocab)

    useEffect(() => {
        dispatch(fetchWordsOfTheDay())
    }, [])

    return <>
        <h3 style={{textAlign: "center"}}>Word Of The Day</h3>
        {wordOfTheDay.map(wordMeaning => <WordMeaning wordMeaning={wordMeaning}/>)}
    </>
}

export default WordsOfTheDay;