import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../../hooks/use-input';
import { emailValidator, passwordValidator, usernameValidator } from './../validators'
import styles from './StartForm.module.css';
import Container from 'react-bootstrap/Container';

const StartForm = (props) => {
    const
        { value: usernameValue,
            isTouched: usernameIsTouched,
            isValid: usernameIsValid,
            hasError: usernameHasError,
            valueChangeHandler: usernameChangeHandler,
            valueBlurHandler: usernameBlurHandler,
            reset: usernameReset
        } = useInput(usernameValidator)

    const
        { value: emailValue,
            isTouched: emailIsTouched,
            isValid: emailIsValid,
            hasError: emailHasError,
            valueChangeHandler: emailChangeHandler,
            valueBlurHandler: emailBlurHandler,
            reset: emailReset
        } = useInput(emailValidator)

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
        props.onAdminAccFilled(usernameValue, emailValue, passwordValue);
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
        usernameIsValid &&
        usernameIsTouched &&
        emailIsValid &&
        emailIsTouched &&
        passwordIsValid &&
        passwordIsTouched &&
        repeatedPasswordIsValid &&
        repeatedPasswordIsTouched &&
        passwordsMatch;

    const buttonDisabledClass = formIsValid ? "" : "disabled";


    return (
        <Container className={`${styles['main']} min-vh-100 d-flex flex-column`} fluid>
            <h1 className={styles['admin-header']}>create admin account</h1>
            <Form className={`${styles['start-form']}`} onSubmit={formSubmitHandler}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={styles['form-label']}>Username</Form.Label>
                    <Form.Control
                        className={styles['control-input']}
                        isValid={usernameIsValid && usernameIsTouched}
                        isInvalid={!usernameIsValid && usernameIsTouched}
                        onBlur={usernameBlurHandler}
                        onChange={usernameChangeHandler}
                        value={usernameValue}
                        type="username"
                        placeholder="Enter username"

                    />
                    <Form.Text className="text-muted">
                        6 to 20 characters, _ . might be not allowed at the beginning/end
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={styles['form-label']}>Email address</Form.Label>
                    <Form.Control
                        className={styles['control-input']}
                        isValid={emailIsValid && emailIsTouched}
                        isInvalid={!emailIsValid && emailIsTouched}
                        onBlur={emailBlurHandler}
                        onChange={emailChangeHandler}
                        value={emailValue}
                        type="email"
                        placeholder="Enter email"

                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label className={styles['form-label']}>Password</Form.Label>
                    <Form.Control
                        className={styles['control-input']}
                        isValid={passwordIsValid && passwordIsTouched}
                        isInvalid={(!passwordIsValid && passwordIsTouched) || (!passwordsMatch && passwordIsTouched)}
                        onBlur={passwordBlurHandler} onChange={passwordChangeHandler}
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
                        Next!
                    </Button>
                </div>
            </Form>
        </Container >
    );

}

export default StartForm;