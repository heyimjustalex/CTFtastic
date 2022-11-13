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


    if (remaningTime <= 60000) {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('idTeam')
        return null;

    }
    return { username: username, token: storedToken, duration: remaningTime, role: role, idTeam: idTeam };
}

export const AuthContextProvider = (props) => {

    const tokenData = retrieveStoredToken();
    let initialToken;
    let initialRole;
    let initialIdTeam;
    let username;

    if (tokenData) {
        initialIdTeam = tokenData.idTeam;
        initialToken = tokenData.token;
        initialRole = tokenData.role;
        username = tokenData.username;

    }
    const [token, setToken] = useState(initialToken);
    const [role, setRole] = useState(initialRole);
    const [idTeam, setIdTeam] = useState(initialIdTeam);

    const userIsLoggedIn = !!token;

    const updateRoleHandler = (newRole) => {
        localStorage.removeItem('role')
        localStorage.setItem('role', newRole);
        setRole(newRole)
    }


    const updateIdTeamHandler = (newId) => {
        localStorage.removeItem('idTeam')
        localStorage.setItem('idTeam', newId);
        setIdTeam(newId)
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
        setRole(role)
        setIdTeam(idTeam)
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
        login: loginHandler,
        logout: logoutHandler,
        updateRole: updateRoleHandler,
        updateIdTeam: updateIdTeamHandler


    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}


export default AuthContext;