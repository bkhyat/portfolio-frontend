import {SoundOutlined} from "@ant-design/icons";
import {Card, Space, Tag} from "antd";
import {getContryCodeFromURL, getFlagEmojiByContryCode} from "../../../utils";
import "../vocab.less"
import {AudioPlayer} from "../../../common";
import React from "react";


const Pronunciation = ({audio, text}) => {

    return <AudioPlayer url={audio}>
        <div className={'audioSound'}>{<>
            <SoundOutlined/> {audio && getFlagEmojiByContryCode(getContryCodeFromURL(audio))}{text || ''} </>}<br/>
        </div>
    </AudioPlayer>
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

       <Space direction={'vertical'}>
            {meaning.synonyms?.length > 0 && <><strong>Synonyms: </strong> <Space>{meaning.synonyms.map(item => (
            <Tag>{item}</Tag>))}</Space></>}
        {meaning.antonyms?.length > 0 && <><strong>Antonyms: </strong> <Space>{meaning.antonyms.map(item => (<Tag>{item}</Tag>))}</Space></>}
       </Space>
        <hr/>
    </div>
}
const WordMeaning = ({wordMeaning}) => {
    return <Card title={wordMeaning?.word?.charAt(0).toUpperCase()+wordMeaning?.word?.slice(1)}>
        {wordMeaning?.phonetics?.map(item => <Pronunciation {...item}/>)}
        <hr/>
        {wordMeaning?.meanings?.map(meaning => <Meaning meaning={meaning}/>
        )}
    </Card>
}

export default WordMeaning;