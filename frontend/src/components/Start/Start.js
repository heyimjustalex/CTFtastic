import StartForm from './StartForm';
import StartPage from './StartPage';
import StartTime from './StartTime';
import styles from './Start.module.css';
import { useState, useEffect } from 'react';
import { addStartingData } from './../../lib/api'
import useHttp from './../../hooks/use-http'
import LoadingRing from '../UI/LoadingRing';
import Container from 'react-bootstrap/Container';
import useTimer from '../../hooks/use-timer';
import { useNavigate } from "react-router-dom";


const Start = () => {
    const { sendRequest, status, error } = useHttp(addStartingData);
    const [output, setOutput] = useState({});
    const navigate = useNavigate();
    const { time, startTimer, stopTimer } = useTimer(5, () => navigate("/"));

    const [startingData, setStartingData] = useState(
        {
            renderedComponent: 'startPage',
            adminEmail: '',
            adminPassword: '',
            contestStartDate: {},
            contestStartDateUTC: {},
            contestEndDate: {},
            contestEndDateUTC: {},
        }

    );


    useEffect(() => {
        ///sendrequest if it's the end of this process

        if (startingData.renderedComponent === 'end') {
            console.log(startingData);
            const tempData = {

                adminEmail: startingData.adminEmail,
                adminPassword: startingData.adminPassword,
                contestStartDate: startingData.contestStartDate,
                contestStartDateUTC: startingData.contestStartDateUTC,
                contestEndDate: startingData.contestEndDate,
                contestEndDateUTC: startingData.contestEndDateUTC
            }

            sendRequest(tempData)
        }

    }, [startingData, sendRequest]);

    useEffect(() => {
        //handle different status states

        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (status === 'completed' && !error) {

            setOutput({ header: 'Success!', content: 'contest created' });

            console.log('asd')
        }

        else if (status === 'completed' && error) {
            setOutput({ header: 'Error occured:', content: error });

        }

    }, [status, error, setOutput]);


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
            renderedComponent: 'startDateTime'
        });

    }

    const onDateTimeFilledHandler = (dates) => {
        setStartingData({
            ...startingData,
            renderedComponent: 'end',
            contestStartDate: dates.startDate,
            contestEndDate: dates.endDate,
            contestStartDateUTC: dates.startDateUTC,
            contestEndDateUTC: dates.endDateUTC
        })
    }

    if (status === 'completed') {
        startTimer();
    }


    return (
        <>
            {startingData.renderedComponent === 'startPage' &&
                <StartPage onGetStarted={onGetStartedClickedHandler} />}
            {startingData.renderedComponent === 'startForm' &&
                <StartForm onAdminAccFilled={onAdminAccFilledHandler} />}
            {startingData.renderedComponent === 'startDateTime' &&
                <StartTime
                    onDateTimeFilled={onDateTimeFilledHandler}
                    startingData={startingData}
                />}
            {startingData.renderedComponent === 'end' &&
                <Container className={`${styles.main} min-vh-100 d-flex flex-column`} fluid>

                    <div className={styles['output-container']}>
                        <h1>{output ? output.header : ''}</h1>
                        <h1> {output ? output.content : ''}</h1>

                    </div>

                    <div className={styles['redirect-timer']} >
                        <span className={styles['pulsingText']}>
                            <h1>Redirect in...</h1>
                            <h1>{time}</h1>
                        </span>
                    </div>

                </Container>
            }


        </>

    );
}

export default Start;