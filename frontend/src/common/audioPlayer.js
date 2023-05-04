import {useEffect, useState} from "react";

export const AudioPlayer = ({url, children}) => {
    const audio = new Audio(url)
    const [paused, setPaused] = useState(true);

    useEffect(() => {
        paused?audio.play():audio.pause()
    }, [paused])

    const togglePlayPause = () => setPaused(paused => !paused)
    return <div onClick={togglePlayPause}>{children}</div>
}