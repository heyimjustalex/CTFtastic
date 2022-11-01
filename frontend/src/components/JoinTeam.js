import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../hooks/use-input';
import styles from './JoinTeam.module.css';
import Container from 'react-bootstrap/Container';
import { useContext, useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import { joinTeam } from '../lib/api';
import LoadingRing from './UI/LoadingRing';
import { AuthContext } from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import { teamNameValidator } from './validators';
const JoinTeam = (props) => {

    const { sendRequest, data, status, error } = useHttp(joinTeam);
    const [output, setOutput] = useState({});
    const authCTX = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {

        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (status === 'completed' && !error) {

            setOutput({ header: 'Success!', content: 'you have joined team' });
            authCTX.updateRole(data.role);
            authCTX.updateIdTeam(data.idTeam);
            navigate('/');
            window.location.reload();
        }

        else if (status === 'completed' && error) {
            setOutput({ header: 'Error occured:', content: error });

        }

    }, [status, error, setOutput, data, authCTX, navigate]);

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
            name: teamNameValue,
            password: passwordValue,
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

        < Container className={`${styles['main']} d-flex flex-column`} fluid>
            {authCTX.isLoggedIn &&
                <>
                    <h1 className={styles['admin-header']}>join team</h1>
                    <Form className={`${styles['start-form']}`} onSubmit={formSubmitHandler}>
                        <Form.Group className="mb-3" controlId="formBasicTeamName">
                            <Form.Label className={styles['form-label']}>Team Name</Form.Label>
                            <Form.Control
                                className={styles['control-input']}
                                style={{ backgroundColor: "#111", color: "white" }}
                                onChange={teamNameChangeHandler}
                                value={teamNameValue}
                                type="text"
                                placeholder="Enter team name"
                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label className={styles['form-label']}>Team password</Form.Label>
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
                                Join team!
                            </Button>
                        </div>
                        <div className={styles['output-container']}>
                            {!(status === 'pending') &&
                                <h1 className={styles[textColor]}>{output ? output.header : ''}</h1>}

                            {!(status === 'pending') && <h1> {output ? output.content : ''}</h1>}
                            {status === 'pending' &&
                                <LoadingRing />}
                        </div>
                    </Form>   </>}


            {!authCTX.isLoggedIn &&
                <div className={styles['output-container']}>
                    <h1 className={styles['redText']}>You cannot join team if you're not logged in!
                    </h1>
                </div>}
        </Container >

    );

}

export default JoinTeam;