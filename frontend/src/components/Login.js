import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../hooks/use-input';
import styles from './Login.module.css';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import { loginUser } from '../lib/api';
import LoadingRing from './UI/LoadingRing';

const Login = (props) => {

    const { sendRequest, data, status, error } = useHttp(loginUser);
    const [output, setOutput] = useState({});

    useEffect(() => {

        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (status === 'completed' && !error) {
            console.log("DATA FROM USEFECT");
            console.log(data);

            setOutput({ header: 'Success!', content: 'you have been logged in' });

        }

        else if (status === 'completed' && error) {
            setOutput({ header: 'Error occured:', content: error });

        }

    }, [status, error, setOutput]);

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
        console.log("ASDA");
        console.log(emailValue);
        console.log(passwordValue);

        const dataTemp = {
            email: emailValue,
            password: passwordValue
        };

        sendRequest(dataTemp);


    }

    return (
        <Container className={`${styles['main']} d-flex flex-column`} fluid>
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
                {output.content}
            </Form>
        </Container >
    );

}

export default Login;