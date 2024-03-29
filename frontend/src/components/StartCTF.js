import Button from 'react-bootstrap/Button';
import styles from './StartCTF.module.css';
import Container from 'react-bootstrap/Container';
import { useContext, useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import { getContests, startCTF } from '../lib/api';
import LoadingRing from './UI/LoadingRing';
import { AuthContext } from '../store/auth-context';
import { useNavigate } from 'react-router-dom';

const StartCTF = (props) => {
    const { sendRequest, data, status, error } = useHttp(startCTF);

    const { sendRequest: sendRequestGetContestStarted, data: contestData, status: contestStatus, error: contestError } = useHttp(getContests);
    const [output, setOutput] = useState({});
    const authCTX = useContext(AuthContext);
    const navigate = useNavigate();
    const [hasStarted, setHasStarted] = useState(null);

    useEffect(() => {
        sendRequestGetContestStarted();
    }, [])

    useEffect(() => {

        if (contestStatus === 'completed' && !contestError) {
            try {
                const hasStartedFromResponse = contestData.elements[0].hasStarted
                setHasStarted(hasStartedFromResponse)
            }
            catch {
                setHasStarted(null)
            }
        }

    }, [contestData, contestError, contestStatus]);


    useEffect(() => {

        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (status === 'completed' && !error) {
            setOutput({ header: 'Success!', content: 'You have started/stopped CTF!' });
        }

        else if (status === 'completed' && error) {

            setOutput({ header: 'Error occured:', content: error });

        }

    }, [status, error, setOutput, data, authCTX, navigate]);


    const startCtfHandler = (event) => {
        event.preventDefault();


        const dataTemp = {
            token: authCTX.token,
            startOrStopValue: hasStarted ? "stop" : "start"
        };

        sendRequest(dataTemp);
    }

    let textColor = "";
    if (status === 'completed' && !error) {
        textColor = 'blueText';

    }
    if (status === 'completed' && error) {
        textColor = 'redText';
    }


    return (

        <Container className={`${styles['main']} mt-5 d-flex flex-column`} fluid>
            {authCTX.isLoggedIn && authCTX.role === 'ROLE_CTF_ADMIN' &&
                <>   {!hasStarted && hasStarted !== null && <>
                    <h1 className={styles['admin-header']}>Click button to start!</h1>
                    <div className={styles['output-container']}>
                        <p>Starting CTF makes all challenges marked as isVisible visible to the participants</p>
                    </div>
                    <div className={styles['button-div']}>
                        <Button onClick={startCtfHandler} aria-label="Next" className={styles['form-button-red']} variant="custom" type="submit">
                            Start CTF!
                        </Button>
                    </div>
                    <div className={styles['output-container']}>
                        {!(status === 'pending') &&
                            <h1 className={styles[textColor]}>{output ? output.header : ''}</h1>}
                        {!(status === 'pending') && <h1> {output ? output.content : ''}</h1>}
                        {status === 'pending' &&
                            <LoadingRing />}
                    </div>
                </>}
                    {hasStarted && hasStarted !== null &&
                        <>
                            <h1 className={styles['admin-header']}>Click button to stop CTF!</h1>

                            <div className={styles['button-div']}>
                                <Button onClick={startCtfHandler} aria-label="Next" className={styles['form-button-red']} variant="custom" type="submit">
                                    Stop CTF!
                                </Button>
                            </div>
                            <div className={styles['output-container']}>
                                {!(status === 'pending') &&
                                    <h1 className={styles[textColor]}>{output ? output.header : ''}</h1>}
                                {!(status === 'pending') && <h1> {output ? output.content : ''}</h1>}
                                {status === 'pending' &&
                                    <LoadingRing />}
                            </div>
                        </>

                    }

                </>
            }

            {
                (!authCTX.isLoggedIn || authCTX.role !== 'ROLE_CTF_ADMIN') &&
                <div className={styles['output-container']}>
                    <h1 className={styles['redText']}>You have to be logged in as CTF admin to start CTF!
                    </h1>
                </div>
            }



        </Container >
    );

}

export default StartCTF;