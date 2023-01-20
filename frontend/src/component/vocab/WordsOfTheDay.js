import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchWordsOfTheDay} from "../../rtk/vocab/slices";
import {SoundOutlined} from "@ant-design/icons";
import WordMeaning from "./WordMeaning";

const WordsOfTheDay = () => {
    const dispatch = useDispatch();
    const {wordOfTheDay} = useSelector(state => state.vocab)

    useEffect(() => {
        dispatch(fetchWordsOfTheDay())
    }, [])

    return <>
        <h3 style={{textAlign: "center"}}>Word Of The Day</h3>
        <WordMeaning wordMeaning={wordOfTheDay}/>
    </>
}

export default WordsOfTheDay;