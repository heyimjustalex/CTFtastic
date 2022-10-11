import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../hooks/use-input';
import styles from './Login.module.css';
import Container from 'react-bootstrap/Container';

const Register = (props) => {

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
        props.onAdminAccFilled(emailValue, passwordValue);

    }




    return (
        <Container className={`${styles['main']} d-flex flex-column`} fluid>
            <h1 className={styles['admin-header']}>login</h1>
            <Form className={`${styles['start-form']}`} onSubmit={formSubmitHandler}>

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
                        isInvalid={(!passwordIsValid && passwordIsTouched)}
                        onBlur={passwordBlurHandler} onChange={passwordChangeHandler}
                        type="password"
                        placeholder="Password"
                        value={passwordValue}

                    />
                    <Form.Text className="text-muted">
                        2 uppercase, 2 lowercase, 2 digits, 2 special characters
                    </Form.Text>
                </Form.Group>



                <div className={styles['button-div']}>
                    <Button aria-label="Next" className={styles['form-button']} variant="custom" type="submit">
                        Sign in!
                    </Button>
                </div>
            </Form>
        </Container >
    );

}

export default Register;