import StartForm from './StartForm';
import StartPage from './StartPage';
import StartTime from './StartTime';
import styles from './Start.module.css';
import { useState, useEffect, useContext } from 'react';
import { addStartingData } from './../../lib/api'
import useHttp from './../../hooks/use-http'
import LoadingRing from '../UI/LoadingRing';
import Container from 'react-bootstrap/Container';
import useTimer from '../../hooks/use-timer';
import { useNavigate } from "react-router-dom";
import StartContext from './../../store/start-context';
import BasicDescription from './BasicDescription';
const Start = (props) => {
    window.history.pushState({}, null, "/start");

    const { hasStarted, setFalseStarted, setTrueStarted } = useContext(StartContext);
    const navigate = useNavigate();
    const { sendRequest, status, error } = useHttp(addStartingData);
    const [output, setOutput] = useState({});

    const { time: timeWhenContestCreated, startTimer: startTimerWhenContestCreated, stopTimer: stopTimerWhenContestCreated } = useTimer(3, () => {
        setTrueStarted();
        navigate("/");
    });

    const { time: timeWhenContestCreationFailed, startTimer: startTimerWhenContestCreationFailed, stopTimer: stopTimerWhenCreationFailed } = useTimer(3, () => {
        setFalseStarted();
        navigate('/start');
    });

    const [startingData, setStartingData] = useState(
        {
            renderedComponent: 'startPage',
            title: '',
            description: '',
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
            // console.log(startingData);
            const tempData = {
                title: startingData.title,
                description: startingData.description,
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

        }

        else if (status === 'completed' && error) {
            setOutput({ header: 'Error occured:', content: error });

        }

    }, [status, error, setOutput]);


    const onGetStartedClickedHandler = () => {
        setStartingData({
            ...startingData,
            renderedComponent: 'basicDescription'
        });
    }

    const onDescriptionFilledHandler = (title, description) => {
        setStartingData({
            ...startingData,
            title: title,
            description: description,
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
            contestStartDate: dates.startDate,
            contestEndDate: dates.endDate,
            contestStartDateUTC: dates.startDateUTC,
            contestEndDateUTC: dates.endDateUTC,
            renderedComponent: 'end'
        })
    }
    let textColor = "";
    let time = "";
    if (status === 'completed' && !error) {
        textColor = styles['whiteText'];
        startTimerWhenContestCreated();
        time = timeWhenContestCreated;
    }
    if (status === 'completed' && error) {
        textColor = styles['redText'];
        startTimerWhenContestCreationFailed();
        time = timeWhenContestCreationFailed;
    }


    return (
        <>
            {startingData.renderedComponent === 'startPage' &&
                <StartPage onGetStarted={onGetStartedClickedHandler} />}

            {startingData.renderedComponent === 'basicDescription' &&
                <BasicDescription onDescriptionFilled={onDescriptionFilledHandler} />}

            {startingData.renderedComponent === 'startForm' &&
                <StartForm onAdminAccFilled={onAdminAccFilledHandler} />}

            {startingData.renderedComponent === 'startDateTime' &&
                <StartTime onDateTimeFilled={onDateTimeFilledHandler} />}

            {startingData.renderedComponent === 'end' &&
                <Container className={`${styles['main']} min-vh-100 d-flex flex-column`} fluid>

                    <div className={styles['output-container']}>
                        <h1 className={textColor}>{output ? output.header : ''}</h1>
                        <h1> {output ? output.content : ''}</h1>
                    </div>
                    {!(status === 'pending') &&
                        <div className={styles['redirect-timer']} >
                            <span className={styles['pulsingText']}>
                                <h1>Redirect in...</h1>
                                <h1>{time}</h1>
                            </span>
                        </div>}

                </Container>
            }
        </>
    );
}

export default Start;