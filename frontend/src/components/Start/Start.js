import StartForm from './StartForm';
import StartPage from './StartPage';
import StartTime from './StartTime';
import styles from './Start.module.css';
import { useState, useEffect, useContext } from 'react';
import { setUpContest } from './../../lib/api'
import useHttp from './../../hooks/use-http'
import LoadingRing from '../UI/LoadingRing';
import Container from 'react-bootstrap/Container';
import useTimer from '../../hooks/use-timer';
import { useNavigate } from "react-router-dom";
import StartContext from './../../store/start-context';
import BasicDescription from './BasicDescription';
import AuthContext from '../../store/auth-context';

const Start = (props) => {

    const { hasStarted, setFalseStartedLocalStorage, setTrueStartedLocalStorage } = useContext(StartContext);
    const navigate = useNavigate();
    const { sendRequest, data, status, error } = useHttp(setUpContest);
    const [output, setOutput] = useState({});
    const authCTX = useContext(AuthContext);

    const {
        time: timeWhenContestCreated,
        startTimer: startTimerWhenContestCreated,
        stopTimer: stopTimerWhenContestCreated } = useTimer(3, () => {
            setTrueStartedLocalStorage();
            navigate("/");
        });

    const { time: timeWhenContestCreationFailed, startTimer: startTimerWhenContestCreationFailed, stopTimer: stopTimerWhenCreationFailed } = useTimer(3, () => {
        setFalseStartedLocalStorage();
        navigate('/start');
    });

    const [startingData, setStartingData] = useState(
        {
            renderedComponent: 'startPage',
            title: '',
            description: '',
            adminUsername: '',
            adminEmail: '',
            adminPassword: '',
            contestStartDate: {},
            contestStartDateUTC: {},
            contestEndDate: {},
            contestEndDateUTC: {},
        }
    );

    useEffect(() => {

        if (startingData.renderedComponent === 'end') {
            const transformDate = (date) => {

                date = new Date(date);
                let month = date.getMonth();
                let day = date.getDate();
                let hour = date.getHours();
                let minute = date.getMinutes();
                let second = date.getSeconds();

                month >= 0 && month <= 9 ? month = '0' + String(month) : String(month);
                day >= 0 && day <= 9 ? day = '0' + String(day) : String(day);
                hour >= 0 && hour <= 9 ? hour = '0' + String(hour) : String(hour);
                minute >= 0 && minute <= 9 ? minute = '0' + String(minute) : String(minute);
                second >= 0 && second <= 9 ? second = '0' + String(second) : String(second);

                const temp = String(date.getFullYear() + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second);
                return temp;
            }

            const tempData = {
                username: startingData.adminUsername,
                email: startingData.adminEmail,
                password: startingData.adminPassword,
                startTime: transformDate(startingData.contestStartDate),
                startTimeUtf: transformDate(startingData.contestStartDateUTC),
                endTime: transformDate(startingData.contestEndDate),
                endTimeUtf: transformDate(startingData.contestEndDateUTC),
                title: startingData.title,
                description: startingData.description
            }

            sendRequest(tempData)
        }

    }, [startingData, sendRequest]);

    useEffect(() => {
        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (status === 'completed' && !error) {

            const expTime = new Date((new Date().getTime() + (+data.expireTime * 1000)));
            authCTX.login(startingData.adminUsername, data.token, data.role, expTime, null)
            setOutput({ header: 'Success!', content: 'contest created' });
        }

        else if (status === 'completed' && error) {
            setOutput({ header: 'Error occured:', content: error });

        }

    }, [status, error, setOutput, authCTX, startingData.adminUsername, data]);


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

    const onAdminAccFilledHandler = (username, email, password) => {
        setStartingData({
            ...startingData,
            adminUsername: username,
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