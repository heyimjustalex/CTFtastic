import React, { useState, useCallback, useEffect } from "react"
import useHttp from "../hooks/use-http";

const StartContext = React.createContext({
    hasStarted: false,
    setFalseStarted: () => { },
    setTrueStarted: () => { }
})

export const StartContextProvider = (props) => {

    // const { sendRequest, data, status, error } = useHttp(getStartingInfo);
    const retrieveHasStartedInfo = () => {


        const storedHasStarted = localStorage.getItem('hasStarted');
        if (storedHasStarted) {
            return true
        }
        else {

        }
        return false
    }
    const [hasStarted, setHasStarted] = useState(true);
    useEffect(() => {
        const initalState = retrieveHasStartedInfo();
        setHasStarted(initalState);
    }, [])

    const setFalseStarted = useCallback(() => {
        localStorage.removeItem('hasStarted');
        setHasStarted(false);
    })
    const setTrueStarted = useCallback(() => {
        localStorage.setItem('hasStarted', true)
        setHasStarted(true);
    })

    const contextValue = {
        hasStarted: hasStarted,
        setFalseStarted,
        setTrueStarted
    }

    return <StartContext.Provider value={contextValue}>{props.children}</StartContext.Provider>
}


export default StartContext;