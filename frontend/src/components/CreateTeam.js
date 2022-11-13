import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../hooks/use-input';
import { teamNameValidator, passwordValidator } from './validators'
import styles from './CreateTeam.module.css';

import Container from 'react-bootstrap/Container';
import { createTeam } from './../lib/api'
import useHttp from './../hooks/use-http'
import { useState, useEffect } from 'react';
import LoadingRing from './UI/LoadingRing';
import AuthContext from '../store/auth-context';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';


const CreateTeam = () => {

    const { sendRequest, data, status, error } = useHttp(createTeam);
    const [output, setOutput] = useState({});
    const authCTX = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (status === 'completed' && !error) {
            setOutput({ header: 'Success!', content: 'Team created' });

            authCTX.updateRole(data.role);
            authCTX.updateIdTeam(data.idTeam);
            navigate(`/teams/${data.idTeam}`);
            // window.location.reload();
        }

        else if (status === 'completed' && error) {
            setOutput({ header: 'Error occured:', content: error });
        }

    }, [status, error, setOutput, authCTX, data, navigate]);

    const
        { value: teamNameValue,
            isTouched: teamNameIsTouched,
            isValid: teamNameIsValid,
            hasError: teamNameHasError,
            valueChangeHandler: teamNameChangeHandler,
            valueBlurHandler: teamNameBlurHandler,
            reset: teamNameReset
        } = useInput(teamNameValidator)

    const
        { value: websiteValue,
            isTouched: websiteIsTouched,
            isValid: websiteIsValid,
            hasError: websiteHasError,
            valueChangeHandler: websiteChangeHandler,
            valueBlurHandler: websiteBlurHandler,
            reset: websiteReset
        } = useInput(() => { return true; })

    const
        { value: affiliationValue,
            isTouched: affiliationIsTouched,
            isValid: affiliationIsValid,
            hasError: affiliationHasError,
            valueChangeHandler: affiliationChangeHandler,
            valueBlurHandler: affiliationBlurHandler,
            reset: affiliationReset
        } = useInput(() => { return true; })

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
            name: teamNameValue,
            password: passwordValue,
            website: websiteValue,
            affiliation: affiliationValue
        }
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
        teamNameIsValid &&
        teamNameIsTouched &&
        teamNameIsValid &&
        teamNameIsTouched &&
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
            {authCTX.isLoggedIn && authCTX.role !== "ROLE_TEAM_CAPITAN" && <>
                <h1 className={styles['top-header']}>register team</h1>
                <Form className={`${styles['start-form']}`} onSubmit={formSubmitHandler}>

                    <Form.Group className="mb-3" controlId="formBasicTeamName">
                        <Form.Label className={styles['form-label']}>Team Name</Form.Label>
                        <Form.Control
                            className={styles['control-input']}
                            isValid={teamNameIsValid && teamNameIsTouched}
                            isInvalid={!teamNameIsValid && teamNameIsTouched}
                            onBlur={teamNameBlurHandler}
                            onChange={teamNameChangeHandler}
                            value={teamNameValue}
                            type="text"
                            placeholder="Enter team name"

                        />
                        <Form.Text className="text-muted">
                            6 to 20 characters, _ . might be not allowed at the beginning/end
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formWebsite">
                        <Form.Label className={styles['form-label']}>Website</Form.Label>
                        <Form.Control
                            className={styles['control-input']}
                            isValid={websiteIsValid && websiteIsTouched}
                            isInvalid={!websiteIsValid && websiteIsTouched}
                            onBlur={websiteBlurHandler}
                            onChange={websiteChangeHandler}
                            value={websiteValue}
                            type="text"
                            placeholder="Enter website"

                        />
                        <Form.Text className="text-muted">
                            If you dont have website leave empty
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAffiliation">
                        <Form.Label className={styles['form-label']}>Affiliation</Form.Label>
                        <Form.Control
                            className={styles['control-input']}
                            isValid={affiliationIsValid && affiliationIsTouched}
                            isInvalid={!affiliationIsValid && affiliationIsTouched}
                            onBlur={affiliationBlurHandler}
                            onChange={affiliationChangeHandler}
                            value={affiliationValue}
                            type="text"
                            placeholder="Enter Affiliation"
                        />
                        <Form.Text className="text-muted">
                            If you dont have affiliation leave empty
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
                            Create team!
                        </Button>
                    </div>
                </Form>

                <div className={styles['output-container']}>

                    {!(status === 'pending') &&
                        <h1 className={styles[textColor]}>{output ? output.header : ''}</h1>}

                    {!(status === 'pending') && <h1> {output ? output.content : ''}</h1>}

                    {status === 'pending' && output.content}

                </div></>}

            {!authCTX.isLoggedIn &&
                <div className={styles['output-container']}>
                    <h1 className={styles['redText']}>You cannot create team if you're not logged in!</h1>
                </div>}

            {authCTX.isLoggedIn &&
                authCTX.role === "ROLE_TEAM_CAPITAN" &&
                <div className={styles['output-container']}>
                    <h1 className={styles['redText']}>You are already a team-capitan</h1>
                </div>}
        </Container >
    );
}

export default CreateTeam;