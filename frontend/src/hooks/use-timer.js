import { useEffect } from "react"
import { useState } from "react"


const useTimer = (startTime, callbackOnEnd = () => { }) => {
    const [time, setTime] = useState(startTime)
    const [intervalID, setIntervalID] = useState(null)
    const hasTimerEnded = time < 0
    const isTimerRunning = intervalID != null

    const update = () => {
        setTime(time => time - 1)
    }
    const startTimer = () => {
        if (!hasTimerEnded && !isTimerRunning) {
            setIntervalID(setInterval(update, 1000))
        }
    }
    const stopTimer = () => {
        clearInterval(intervalID)
        setIntervalID(null)
    }
    // clear interval when the timer ends
    useEffect(() => {
        if (hasTimerEnded) {
            callbackOnEnd()
            clearInterval(intervalID)
            setIntervalID(null)
        }
    }, [hasTimerEnded])
    // clear interval when component unmounts
    useEffect(() => () => {
        clearInterval(intervalID)
    }, [])
    return {
        time,
        startTimer,
        stopTimer,
    }
}

export default useTimer;