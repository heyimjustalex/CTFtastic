import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../hooks/use-input';
import { passwordValidator, oldPasswordValidator } from './validators'
import styles from './ChangeCredentials.module.css';
import Container from 'react-bootstrap/Container';
import { changeUserCredentials } from './../lib/api'
import useHttp from './../hooks/use-http'
import { useState, useEffect } from 'react';
import LoadingRing from './UI/LoadingRing';
import AuthContext from '../store/auth-context';
import { useContext } from 'react';

const ChangeCredentials = (props) => {

    const { sendRequest, status, error } = useHttp(changeUserCredentials);
    const [output, setOutput] = useState({});
    const authCTX = useContext(AuthContext);
    useEffect(() => {

        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (status === 'completed' && !error) {
            setOutput({ header: 'Success!', content: 'Account credentials updated' });
        }

        else if (status === 'completed' && error) {
            setOutput({ header: 'Error occured:', content: error });

        }

    }, [status, error, setOutput]);

    const
        { value: oldPasswordValue,
            isTouched: oldPasswordIsTouched,
            isValid: oldPasswordIsValid,
            hasError: oldPasswordHasError,
            valueChangeHandler: oldPasswordChangeHandler,
            valueBlurHandler: oldPasswordBlurHandler,
            reset: oldPasswordReset
        } = useInput(() => oldPasswordValidator)

    const
        {
            value: passwordValue,
            isTouched: passwordIsTouched,
            isValid: passwordIsValid,
            hasError: passwordHasError,
            valueChangeHandler: passwordChangeHandler,
            valueBlurHandler: passwordBlurHandler,
            reset: passwordReset
        } = useInput(passwordValidator)

    const
        {
            value: repeatedPasswordValue,
            isTouched: repeatedPasswordIsTouched,
            isValid: repeatedPasswordIsValid,
            hasError: repeatedPasswordHasError,
            valueChangeHandler: repeatedPasswordChangeHandler,
            valueBlurHandler: repeatedPasswordBlurHandler,
            reset: repeatedPasswordReset
        } = useInput(passwordValidator)


    const formSubmitHandler = (event) => {
        event.preventDefault();
        const requestData = {
            token: authCTX.token,
            oldPassword: oldPasswordValue,
            newPassword: passwordValue,
        }
        repeatedPasswordReset();
        passwordReset();
        sendRequest(requestData);
    }


    let passwordsMatch = null;
    if (passwordValue !== "" && repeatedPasswordValue !== "") {
        passwordsMatch = passwordValue === repeatedPasswordValue
    }

    else if (passwordValue === "" || repeatedPasswordValue === "") {
        passwordsMatch = true;
    }

    else {
        passwordsMatch = false;
    }

    const formIsValid =
        oldPasswordIsValid &&
        oldPasswordIsTouched &&
        passwordIsValid &&
        passwordIsTouched &&
        repeatedPasswordIsValid &&
        repeatedPasswordIsTouched &&
        passwordsMatch;

    const buttonDisabledClass = formIsValid ? "" : "disabled";
    let textColor = "";
    if (status === 'completed' && !error) {
        textColor = 'blueText';

    }
    if (status === 'completed' && error) {
        textColor = 'redText';
    }

    return (
        <Container className={`${styles['main']} d-flex flex-column`} fluid>

            {authCTX.isLoggedIn &&
                <>
                    <h1 className={styles['admin-header']}>change your creds</h1>
                    <Form className={`${styles['start-form']}`} onSubmit={formSubmitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicOldPassword">
                            <Form.Label className={styles['form-label']}>Old password</Form.Label>
                            <Form.Control
                                className={styles['control-input']}
                                isValid={oldPasswordIsValid && oldPasswordIsTouched}
                                isInvalid={!oldPasswordIsValid && oldPasswordIsTouched}
                                onBlur={oldPasswordBlurHandler}
                                onChange={oldPasswordChangeHandler}
                                value={oldPasswordValue}
                                type="password"
                                placeholder="Current Password"
                            />
                            <Form.Text className="text-muted">
                                Enter your current password here.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label className={styles['form-label']}>Password</Form.Label>
                            <Form.Control
                                className={styles['control-input']}
                                isValid={passwordIsValid && passwordIsTouched}
                                isInvalid={(!passwordIsValid && passwordIsTouched) || (!passwordsMatch && passwordIsTouched)}
                                onBlur={passwordBlurHandler}
                                onChange={passwordChangeHandler}
                                type="password"
                                placeholder="Password"
                                value={passwordValue}

                            />
                            <Form.Text className="text-muted">
                                2 uppercase, 2 lowercase, 2 digits, 2 special characters
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formRepeatPassword">
                            <Form.Label className={styles['form-label']}>Repeat Password</Form.Label>
                            <Form.Control className={styles['control-input']}
                                isValid={repeatedPasswordIsValid && repeatedPasswordIsTouched && passwordsMatch}
                                isInvalid={(!repeatedPasswordIsValid && repeatedPasswordIsTouched) || (!passwordsMatch && repeatedPasswordIsTouched)}
                                onBlur={repeatedPasswordBlurHandler} onChange={repeatedPasswordChangeHandler}
                                type="password"
                                placeholder="Repeat Password"
                                value={repeatedPasswordValue}
                            />
                            {!passwordsMatch && repeatedPasswordIsTouched && passwordIsTouched &&
                                <Form.Text>
                                    <p>Passwords do not match!</p>
                                </Form.Text>}
                        </Form.Group>

                        <div className={styles['button-div']}>
                            <Button aria-label="Next" onSubmit={formSubmitHandler} disabled={!formIsValid} className={`${styles['form-button']} ${buttonDisabledClass}`} variant="custom" type="submit">
                                Update!
                            </Button>
                        </div>
                    </Form>

                    <div className={styles['output-container']}>

                        {!(status === 'pending') &&
                            <h1 className={styles[textColor]}>{output ? output.header : ''}</h1>}

                        {!(status === 'pending') && <h1> {output ? output.content : ''}</h1>}

                        {status === 'pending' &&
                            <LoadingRing />}
                    </div>
                </>}
            {!authCTX.isLoggedIn &&
                <div className={styles['output-container']}>
                    <h1 className={styles['redText']}>You cannot change credentials if you're not logged in!</h1>
                </div>}
        </Container >
    );
}

export default ChangeCredentials;