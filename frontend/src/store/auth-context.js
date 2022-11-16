import React, { useEffect, useState, useCallback } from "react"

let logoutTimer;

export const AuthContext = React.createContext({
    username: '',
    token: '',
    role: '',
    isLoggedIn: false,
    ctfHasStarted: false,
    idTeam: '',
    teamName: '',
    login: (username, token, role, expirationTime, idTeam, teamName) => { },
    logout: () => { },
    updateRole: (newRole) => { },
    updateIdTeam: (newId) => { },
    updateTeamName: (newTeamName) => { }


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
    const teamName = localStorage.getItem('teamName');

    if (remaningTime <= 60000) {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('idTeam')
        localStorage.removeItem('teamName')
        return null;

    }
    return { username: username, token: storedToken, duration: remaningTime, role: role, idTeam: idTeam, teamName: teamName };
}

export const AuthContextProvider = (props) => {

    const tokenData = retrieveStoredToken();
    let initialToken;
    let initialRole;
    let initialIdTeam;
    let username;
    let initialTeamName;

    if (tokenData) {
        initialIdTeam = tokenData.idTeam;
        initialToken = tokenData.token;
        initialRole = tokenData.role;
        username = tokenData.username;
        initialTeamName = tokenData.teamName;
    }
    const [token, setToken] = useState(initialToken);
    const [role, setRole] = useState(initialRole);
    const [idTeam, setIdTeam] = useState(initialIdTeam);
    const [teamName, setTeamName] = useState(initialTeamName);

    const userIsLoggedIn = !!token;

    const updateRoleHandler = (newRole) => {
        localStorage.removeItem('role')
        localStorage.setItem('role', newRole);
        setRole(newRole)
    }
    const updateTeamNameHandler = (newTeamName) => {
        localStorage.removeItem('teamName')
        localStorage.setItem('teamName', newTeamName);
        setTeamName(newTeamName)
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
        localStorage.removeItem('idTeam');
        localStorage.removeItem('teamName');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }

    }, [])



    const loginHandler = (username, token, role, expireTime, idTeam, teamName) => {
        setToken(token);
        setRole(role)
        setIdTeam(idTeam)
        setTeamName(teamName)
        localStorage.setItem('username', username);
        localStorage.setItem('idTeam', idTeam);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expireTime);
        localStorage.setItem('role', role);
        localStorage.setItem('teamName', teamName);
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
        teamName: teamName,
        login: loginHandler,
        logout: logoutHandler,
        updateRole: updateRoleHandler,
        updateIdTeam: updateIdTeamHandler,
        updateTeamName: updateTeamNameHandler

    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}


export default AuthContext;