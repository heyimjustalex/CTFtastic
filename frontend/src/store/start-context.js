import React, { useState, useCallback, useEffect } from "react"



const StartContext = React.createContext({
    hasStarted: false
})


const retrieveHasStartedInfo = () => {
    const storedHasStarted = localStorage.getItem('hasStarted');
    if (storedHasStarted) {
        return true
    }
    return false
}

export const StartContextProvider = (props) => {

    const [hasStarted, setHasStarted] = useState(false);
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