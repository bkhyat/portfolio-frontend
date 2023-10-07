import WordsOfTheDay from "./WordsOfTheDay";
import {Card, Col, Row} from "antd";
// import PracticeSets from "./practice";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchPageCount, fetchWordsInPages} from "../../rtk/vocab_/slices";
import Practice from "./practice_";
import {fetchSets} from "../../rtk/vocab/slices";
import {PracticeSets} from "./practice/"


const Vocab = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSets())
    }, [])
    return <div
    //     style={{
    //     position: 'absolute', left: '50%', top: '25%',
    //     transform: 'translate(-50%, -50%)'
    // }}
    >
        {/*<WordsOfTheDay/>*/}
        <div

        >
            <PracticeSets />
        </div>
    </div>
}

export default Vocab;