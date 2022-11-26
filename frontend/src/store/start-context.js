import React, { useState, useCallback } from "react"
// const BACKEND_ADDRESS = 'http://localhost:8080';
const BACKEND_ADDRESS = process.env.REACT_APP_BACKEND_ADDRESS;

const StartContext = React.createContext({
    hasStarted: '',
    containersStartedState: null,
    setFalseStartedLocalStorage: () => { },
    setTrueStartedLocalStorage: () => { },
    askBackendIfContestHasStarted: () => { }
})

export const StartContextProvider = (props) => {

    const askBackendIfContestHasStarted = async () => {
        if (retrieveHasStartedInfo()) {
            return true;
        }
        async function getContests() {

            const response = await fetch(`${BACKEND_ADDRESS}/contests`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response;

            if (!response.ok) {
                throw new Error(data.error || 'Couldnt fetch teams data.');
            }

            var contentType = response.headers.get('content-type')
            if (contentType && contentType.indexOf('application/json') !== -1) {
                return response.json();
            } else {
                return null;
            }
        }

        try {
            let data = await getContests();
            if (data.elements.length) {
                return true;

            }
            return false;
        }
        catch {
            console.log("Network error! Backend does not work!")
        }

        return true;
    }

    const retrieveHasStartedInfo = () => {
        const storedHasStarted = localStorage.getItem('hasStarted');

        if (storedHasStarted) {

            return true;
        }
        return false;
    }
    const [hasStarted, setHasStarted] = useState(true);
    const [containersStartedState, setContainersStartedState] = useState(null);
    // useEffect(() => {
    //     const initalState = retrieveHasStartedInfo();
    //     setHasStarted(initalState);
    // }, [])

    const setFalseStartedLocalStorage = useCallback(() => {
        localStorage.removeItem('hasStarted');
        setHasStarted(false);
    })
    const setTrueStartedLocalStorage = useCallback(() => {
        localStorage.setItem('hasStarted', true)
        setHasStarted(true);
    })

    const contextValue = {
        hasStarted: hasStarted,
        containersStartedState: containersStartedState,
        setContainersStartedState: setContainersStartedState,
        setFalseStartedLocalStorage: setFalseStartedLocalStorage,
        setTrueStartedLocalStorage: setTrueStartedLocalStorage,
        askBackendIfContestHasStarted: askBackendIfContestHasStarted
    }

    return <StartContext.Provider value={contextValue}>{props.children}</StartContext.Provider>
}

export default StartContext;