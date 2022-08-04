const Achievements = ({achievements}) => {

    return (
        <ul>
            {(achievements || []).map(item => <li>{item.link ? <a href={item.link} target={'_blank'}
                                                                  referrerPolicy={'no-referrer'}
                                                                  rel="noreferrer">{item.description}</a> : item.description}</li>)}
        </ul>
    )
}
export default Achievements;