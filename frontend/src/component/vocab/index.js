import WordsOfTheDay from "./WordsOfTheDay";


const Vocab = () => {

    return <div  style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}><WordsOfTheDay/></div>
}

export default Vocab;