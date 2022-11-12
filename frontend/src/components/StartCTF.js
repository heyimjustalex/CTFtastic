import Button from 'react-bootstrap/Button';
import styles from './StartCTF.module.css';
import Container from 'react-bootstrap/Container';
import { useContext, useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import { getContests, startCTF } from '../lib/api';
import LoadingRing from './UI/LoadingRing';
import { AuthContext } from '../store/auth-context';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
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
            setHasStarted(true)
        }

    }, [contestError, contestStatus]);


    useEffect(() => {

        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (status === 'completed' && !error) {
            // authCTX.updateCTFHasStartedHandler(true);
            setOutput({ header: 'Success!', content: 'You have started CTF!' });
        }

        else if (status === 'completed' && error) {

            setOutput({ header: 'Error occured:', content: error });

        }

    }, [status, error, setOutput, data, authCTX, navigate]);


    const startCtfHandler = (event) => {
        event.preventDefault();


        const dataTemp = {
            token: authCTX.token
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
                        <Button onClick={startCtfHandler} aria-label="Next" className={styles['form-button']} variant="custom" type="submit">
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
                    {hasStarted && <>
                        <h1 className={styles['admin-header']}>You have already started CTF!</h1>

                    </>}
                </>
            }

            {
                (!authCTX.isLoggedIn || authCTX.role !== 'ROLE_CTF_ADMIN') &&
                <div className={styles['output-container']}>
                    <h1 className={styles['redText']}>You have to be logged in as CTF admin to start CTF!
                    </h1>
                </div>
            }
            {
                (authCTX.isLoggedIn && authCTX.role === 'ROLE_CTF_ADMIN' && authCTX.ctfHasStarted) &&
                <div className={styles['output-container']}>
                    <h1 className={styles['redText']}>You have already started CTF!
                    </h1>
                </div>
            }
        </Container >
    );

}

export default Login;