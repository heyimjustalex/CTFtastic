import StartForm from './StartForm';
import StartPage from './StartPage';
import StartTime from './StartTime';
import { useState } from 'react';

import { CSSTransition } from 'react-transition-group';
import './Start.module.css';


const Start = () => {
    const [startingData, setStartingData] = useState(
        {
            renderedComponent: 'startPage',
            adminEmail: '',
            adminPassword: '',
            contestStartDate: {}
        }

    );


    const onGetStartedClickedHandler = () => {
        setStartingData({
            ...startingData,
            renderedComponent: 'startForm'
        });
    }

    const onAdminAccFilledHandler = (email, password) => {
        setStartingData({
            ...startingData,
            adminEmail: email,
            adminPassword: password,
            renderedComponent: 'startTime'
        });

    }

    return (
        <>
            {startingData.renderedComponent === 'startPage' &&
                <StartPage onGetStarted={onGetStartedClickedHandler} />}
            {startingData.renderedComponent === 'startForm' &&
                <StartForm onAdminAccFilled={onAdminAccFilledHandler} />}
            {startingData.renderedComponent === 'startTime' &&
                <StartTime startingData={startingData} />}
        </>

    );
}

export default Start;