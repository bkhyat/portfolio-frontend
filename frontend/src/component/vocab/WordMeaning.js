import {SoundOutlined} from "@ant-design/icons";
import {Card} from "antd";

const playAudio = (url) => {
    const audio = new Audio(url)
    audio.play()
}

const WordMeaning = ({wordMeaning}) => {
    return <Card >
        <strong>{wordMeaning?.word}</strong><br/>
        {wordMeaning?.phonetics?.map(item => <div onClick={() => playAudio(item.audio)}>{<>
            <SoundOutlined/> {item.text || ''}</>}<br/></div>)}
        <hr/>
        {wordMeaning?.meanings?.map(meaning => <div>
            <i>{meaning.partOfSpeech}</i><ul>
            {meaning.definitions.map(definition => <li>
                {definition["partOfSpeech"]}
                {definition.definition}<br/>

                {definition.example && <i><strong>eg:</strong> {definition.example}</i>}
            </li>)}</ul>

            {meaning.synonyms?.length > 0 && <><strong>Synonyms: </strong> {meaning.synonyms.map(item => item + ' | ')}</>}
            {meaning.antonyms?.length > 0 && <><strong>Antonyms: </strong> {meaning.antonyms.map(item => item + ' | ')}</>}
            <hr/>
            </div>
        )}
        {/*{JSON.stringify(wordMeaning)}*/}
    </Card>
}

export default WordMeaning;