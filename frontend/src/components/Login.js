import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../hooks/use-input';
import styles from './Login.module.css';
import Container from 'react-bootstrap/Container';
import { useContext, useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import { loginUser } from '../lib/api';
import LoadingRing from './UI/LoadingRing';
import { AuthContext } from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
const Login = (props) => {

    const { sendRequest, data, status, error } = useHttp(loginUser);
    const [output, setOutput] = useState({});
    const authCTX = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {

        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (status === 'completed' && !error) {

            const expTime = new Date((new Date().getTime() + (+data.expireTime * 1000)));
            authCTX.login(data.userName, data.token, data.role, expTime.toISOString(), data.idTeam, data.teamName);
            setOutput({ header: 'Success!', content: 'you have been logged in' });
            navigate('/');
        }

        else if (status === 'completed' && error) {
            setOutput({ header: 'Error occured:', content: error });

        }

    }, [status, error, setOutput, data, authCTX, navigate]);

    const
        { value: emailValue,
            isTouched: emailIsTouched,
            isValid: emailIsValid,
            hasError: emailHasError,
            valueChangeHandler: emailChangeHandler,
            valueBlurHandler: emailBlurHandler,
            reset: emailReset
        } = useInput(() => { return true })

    const
        {
            value: passwordValue,
            isTouched: passwordIsTouched,
            isValid: passwordIsValid,
            hasError: passwordHasError,
            valueChangeHandler: passwordChangeHandler,
            valueBlurHandler: passwordBlurHandler,
            reset: passwordReset
        } = useInput(() => { return true })



    const formSubmitHandler = (event) => {
        event.preventDefault();


        const dataTemp = {
            email: emailValue,
            password: passwordValue
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

        <Container className={`${styles['main']} d-flex flex-column`} fluid>
            {!authCTX.isLoggedIn &&
                <>
                    <h1 className={styles['admin-header']}>login</h1>
                    <Form className={`${styles['start-form']}`} onSubmit={formSubmitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className={styles['form-label']}>Email address</Form.Label>
                            <Form.Control
                                className={styles['control-input']}
                                style={{ backgroundColor: "#111", color: "white" }}
                                onChange={emailChangeHandler}
                                value={emailValue}
                                type="email"
                                placeholder="Enter email"
                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label className={styles['form-label']}>Password</Form.Label>
                            <Form.Control
                                className={styles['control-input']}
                                isValid={null}
                                onChange={passwordChangeHandler}
                                type="password"
                                placeholder="Password"
                                value={passwordValue}
                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <div className={styles['button-div']}>
                            <Button aria-label="Next" className={styles['form-button']} variant="custom" type="submit">
                                Sign in!
                            </Button>
                        </div>
                        <div className={styles['output-container']}>
                            {!(status === 'pending') &&
                                <h1 className={styles[textColor]}>{output ? output.header : ''}</h1>}

                            {!(status === 'pending') && <h1> {output ? output.content : ''}</h1>}
                            {status === 'pending' &&
                                <LoadingRing />}
                        </div>
                    </Form>
                </>
            }

            {authCTX.isLoggedIn && <div className={styles['output-container']}> <h1 className={styles['redText']}>You are logged in!</h1></div>}
        </Container >
    );

}

export default Login;