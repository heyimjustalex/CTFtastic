import React, { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom";


let logoutTimer;

export const AuthContext = React.createContext({
    token: '',
    role: '',
    isLoggedIn: false,
    login: (token, role, expirationTime) => { },
    logout: () => { },

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
    const remaningTime = calculateRemainingTime(storedExpirationDate);

    if (remaningTime <= 60000) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('expirationTime');
        return null;

    }
    return { token: storedToken, duration: remaningTime, role: role };
}

export const AuthContextProvider = (props) => {

    const tokenData = retrieveStoredToken();
    let initialToken;
    let role;
    if (tokenData) {
        initialToken = tokenData.token;
        role = tokenData.role;


    }
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }

    }, [])

    const loginHandler = (token, role, expireTime) => {
        setToken(token);
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
        token: token,
        isLoggedIn: userIsLoggedIn,
        role: role,
        login: loginHandler,
        logout: logoutHandler,

    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}


export default AuthContext;