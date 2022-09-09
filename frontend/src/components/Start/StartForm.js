import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../../hooks/use-input';
import { emailValidator, passwordValidator } from './../validators'



const StartForm = () => {
    const
        {
            value: emailValue,
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
        console.log('formSubmitted');
        event.preventDefault();
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
    const formIsValid = emailIsValid && emailIsTouched && passwordIsValid && passwordIsTouched && repeatedPasswordIsValid && repeatedPasswordIsTouched && passwordsMatch;



    // console.log("MECZ", passwordsMatch)



    return (

        <Form onSubmit={formSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control isValid={emailIsValid && emailIsTouched} isInvalid={!emailIsValid && emailIsTouched} onBlur={emailBlurHandler} onChange={emailChangeHandler} value={emailValue} type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    isValid={passwordIsValid && passwordIsTouched}
                    isInvalid={(!passwordIsValid && passwordIsTouched) || (!passwordsMatch && passwordIsTouched)}
                    onBlur={passwordBlurHandler} onChange={passwordChangeHandler}
                    type="password" placeholder="Password" />
                <Form.Text className="text-muted">
                    2 uppercase, 2 lowercase, 2 digits, 2 special characters
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRepeatPassword">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                    isValid={repeatedPasswordIsValid && repeatedPasswordIsTouched && passwordsMatch}
                    isInvalid={(!repeatedPasswordIsValid && repeatedPasswordIsTouched) || (!passwordsMatch && repeatedPasswordIsTouched)}
                    onBlur={repeatedPasswordBlurHandler} onChange={repeatedPasswordChangeHandler}
                    type="password"
                    placeholder="Password" />
                {!passwordsMatch && repeatedPasswordIsTouched && passwordIsTouched && <Form.Text className="text-muted">
                    Passwords do not match!
                </Form.Text>}
            </Form.Group>

            <Button disabled={!formIsValid} className="btn btn-dark" variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );

}

export default StartForm;