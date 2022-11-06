import React, { useEffect, useState, useCallback } from "react"

let logoutTimer;

export const AuthContext = React.createContext({
    username: '',
    token: '',
    role: '',
    isLoggedIn: false,
    ctfHasStarted: false,
    idTeam: '',
    login: (username, token, role, expirationTime, idTeam) => { },
    logout: () => { },
    updateRole: (newRole) => { },
    updateIdTeam: (newId) => { },
    updateCTFHasStartedHandler: (newStatus) => { }

})

const calculateRemainingTime = (expTime) => {
    const currentTime = new Date().getTime();
    const adjExpTime = new Date(expTime);
    const remainingDuration = adjExpTime - currentTime;

    return remainingDuration;
}

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    const remaningTime = calculateRemainingTime(storedExpirationDate);
    const idTeam = localStorage.getItem('idTeam');
    const ctfHasStarted = localStorage.getItem('ctfHasStarted');

    if (remaningTime <= 60000) {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('idTeam')
        return null;

    }
    return { username: username, token: storedToken, duration: remaningTime, role: role, idTeam: idTeam, ctfHasStarted: ctfHasStarted };
}

export const AuthContextProvider = (props) => {

    const tokenData = retrieveStoredToken();
    let initialToken;
    let role;
    let username;
    let idTeam;
    let ctfHasStarted;
    if (tokenData) {
        idTeam = tokenData.idTeam;
        initialToken = tokenData.token;
        role = tokenData.role;
        username = tokenData.username;
        ctfHasStarted = tokenData.ctfHasStarted;
    }
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const updateRoleHandler = (newRole) => {
        // localStorage.removeItem('role');
        localStorage.setItem('role', newRole);
    }
    const updateCTFHasStartedHandler = (newValue) => {
        // localStorage.removeItem('role');
        localStorage.setItem('ctfHasStarted', newValue);
    }

    const updateIdTeamHandler = (newId) => {
        // localStorage.removeItem('idTeam');
        localStorage.setItem('idTeam', newId);
    }

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('username');
        localStorage.removeItem('idTeam')
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }

    }, [])



    const loginHandler = (username, token, role, expireTime, idTeam) => {
        setToken(token);
        localStorage.setItem('username', username);
        localStorage.setItem('idTeam', idTeam);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expireTime);
        localStorage.setItem('role', role);
        const remainingTime = calculateRemainingTime(expireTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);

    }

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }

    }, [tokenData, logoutHandler])


    const contextValue = {
        username: username,
        token: token,
        isLoggedIn: userIsLoggedIn,
        role: role,
        idTeam: idTeam,
        ctfHasStarted: ctfHasStarted,
        login: loginHandler,
        logout: logoutHandler,
        updateRole: updateRoleHandler,
        updateIdTeam: updateIdTeamHandler,
        updateCtfHasStarted: updateCTFHasStartedHandler

    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}


export default AuthContext;