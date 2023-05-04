import {SoundOutlined} from "@ant-design/icons";
import {Card, Tag} from "antd";
import {getContryCodeFromURL, getFlagEmojiByContryCode} from "../../utils";
import "./vocab.less"
import {AudioPlayer} from "../../common";
import React from "react";


const Pronunciation = ({audio, text}) => {

    return <AudioPlayer url={audio}>
        <div className={'audioSound'}>{<>
        <SoundOutlined/> {audio && getFlagEmojiByContryCode(getContryCodeFromURL(audio))}{text || ''} </>}<br/>
    </div></AudioPlayer>
}
const Meaning = ({meaning}) => {

    return <div>
        <i>{meaning.partOfSpeech}</i>
        <ul>
            {meaning.definitions.map(definition => <li>
                {definition["partOfSpeech"]}
                {definition.definition}<br/>

                {definition.example && <i><strong>eg:</strong> {definition.example}</i>}
            </li>)}</ul>

        {meaning.synonyms?.length > 0 && <><strong>Synonyms: </strong> {meaning.synonyms.map(item => (<Tag>{item}</Tag>))}</>}
        {meaning.antonyms?.length > 0 && <><strong>Antonyms: </strong> {meaning.antonyms.map(item => (<Tag>{item}</Tag>))}</>}
        <hr/>
    </div>
}
const WordMeaning = ({wordMeaning}) => {
    return <Card>
        <strong>{wordMeaning?.word}</strong><br/>
        {wordMeaning?.phonetics?.map(item => <Pronunciation {...item}/>)}
        <hr/>
        {wordMeaning?.meanings?.map(meaning => <Meaning meaning={meaning}/>
        )}
        {/*{JSON.stringify(wordMeaning)}*/}
    </Card>
}

export default WordMeaning;