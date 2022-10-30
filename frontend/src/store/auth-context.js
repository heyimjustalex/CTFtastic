import React, { useEffect, useState, useCallback } from "react"

let logoutTimer;

export const AuthContext = React.createContext({
    username: '',
    token: '',
    role: '',
    isLoggedIn: false,
    login: (username, token, role, expirationTime) => { },
    logout: () => { },
    updateRole: (newRole) => { }

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

    if (remaningTime <= 60000) {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('expirationTime');
        return null;

    }
    return { username: username, token: storedToken, duration: remaningTime, role: role };
}

export const AuthContextProvider = (props) => {

    const tokenData = retrieveStoredToken();
    let initialToken;
    let role;
    let username;
    if (tokenData) {
        initialToken = tokenData.token;
        role = tokenData.role;
        username = tokenData.username;
    }
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const updateRoleHandler = (newRole) => {
        // localStorage.removeItem('role');
        localStorage.setItem('role', newRole);
    }

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('username');
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }

    }, [])

    const loginHandler = (username, token, role, expireTime) => {
        setToken(token);
        localStorage.setItem('username', username);
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
        login: loginHandler,
        logout: logoutHandler,
        updateRole: updateRoleHandler

    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}


export default AuthContext;