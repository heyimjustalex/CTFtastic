import React from "react";
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import { getChallenge, sendFlag, updateChallengeVisiblity } from '../lib/api';
import LoadingRing from './UI/LoadingRing';
import { AuthContext } from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import styles from "./Challenge.module.css"
import { Button, Container, Form } from "react-bootstrap";
import useInput from "../hooks/use-input";
import MySwitch from "./UI/SwitchBox";


const Challenge = () => {
    const { sendRequest: sendRequestGetChallenge, data: challengeData, status: challengeStatus, error: challengeError } = useHttp(getChallenge);
    const { sendRequest: sendRequestUpdateVisiblity, data: updateVisiblityflagData, status: updateVisiblityStatus, error: updateVisiblityError } = useHttp(updateChallengeVisiblity);
    const { sendRequest: sendRequestFlag, data: flagData, status: flagStatus, error: flagError } = useHttp(sendFlag);
    const [output, setOutput] = useState({});
    const [flagValidityOutput, setflagValidityOutput] = useState({});
    const [isVisible, setIsVisible] = useState(false);

    const authCTX = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate()
    const onClickBackToChallengesHandler = () => {
        navigate('/challenges');
    }
    const challengeUpdateSubmitHandler = (event) => {
        event.preventDefault();
        const data = { id: id, token: authCTX.token, isVisible: +isVisible }
        console.log("PATCH CHALL ID", data);

        sendRequestUpdateVisiblity(data);
    }

    const isVisibleSwitchHandler = () => {

        setIsVisible((prev) => { return !prev })

    }


    useEffect(() => {
        const token = authCTX.token;
        const challengeData = {
            token: token,
            challengeId: id
        }

        sendRequestGetChallenge(challengeData);

    }, [sendRequestGetChallenge, id, authCTX.token])

    useEffect(() => {

        if (challengeStatus === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (challengeStatus === 'completed' && !challengeError) {

            challengeData.file = "na sztywno file link";
            challengeData.container = "na sztywno container link"

            const output =
                <>
                    <div className={`${styles['output-content-container']}`}>
                        <h4 className={styles['challenge-header']}>Category: <p> {challengeData.category}</p></h4>
                        <h4 className={styles['challenge-header']}>Points: <p> {challengeData.points} </p></h4>
                        {challengeData.file !== null && <h4 className={styles['challenge-header']}>File link:  <p> {challengeData.file}</p></h4>}
                        {challengeData.container !== null && <h4 className={styles['challenge-header']}>Container link:  <p> {challengeData.file}</p></h4>}

                    </div>
                </>

            setOutput({ header: challengeData.name, content: output });
        }

        else if (challengeStatus === 'completed' && challengeError) {
            setOutput({ header: 'challengeError occured:', content: challengeError });

        }

    }, [challengeStatus, challengeError, setOutput, challengeData]);




    const
        { value: flagValue,
            isTouched: flagIsTouched,
            isValid: flagIsValid,
            hasError: flagHasError,
            valueChangeHandler: flagChangeHandler,
            valueBlurHandler: flagBlurHandler,
            reset: flagReset
        } = useInput(() => { return true })

    const flagSubmitHandler = (event) => {
        event.preventDefault();

        const dataTemp = {
            challengeId: id,
            flag: flagValue
        };


        sendRequestFlag(dataTemp);
    }


    useEffect(() => {

        if (flagStatus === 'pending') {
            setflagValidityOutput({ header: 'Checking flag...', content: <LoadingRing /> });
        }

        else if (flagStatus === 'completed' && !flagError) {

            const output =
                <>
                    <div className={`${styles['output-content-container']}`}>
                        <h4 className={styles['challenge-header']}>Proper Flag</h4>
                    </div>
                </>

            setflagValidityOutput({ header: "ProperFlag", content: output });
        }

        else if (flagStatus === 'completed' && flagError) {
            setflagValidityOutput({ header: 'Wrong flag', content: flagError });

        }

    }, [flagStatus, flagError, setflagValidityOutput, flagData]);


    return (

        <Container className={`${styles['main']} d-flex flex-column`}>

            {challengeStatus === 'completed' && challengeError && !authCTX.isLoggedIn &&
                <Container className={`${styles['output-content-container']}`}>
                    <h3 className={styles['red-header']}>Log in to see details</h3>
                </Container>}
            {challengeStatus === 'pending' && <h3 className={styles['blue-header']}>{output.header}</h3>}
            {challengeStatus === 'pending' && output.content}
            {challengeStatus === 'completed' && authCTX.isLoggedIn &&
                <>
                    {!challengeError && <h2 className={styles['red-header']}>{output.header}</h2>}
                    {!challengeError && output.content}

                    {challengeError &&
                        <Container className={`${styles['output-content-container']}`}>
                            <h3 className={styles['red-header']}>{output.content}</h3>
                        </Container>}

                    {flagStatus === 'pending' && <h3 className={styles['blue-header']}>{output.header}</h3>}
                    {flagStatus === 'pending' && output.content}
                    {(flagStatus === 'completed' || flagStatus === null) && !challengeError && authCTX.role !== 'ROLE_CTF_ADMIN' &&
                        <Form className={`${styles['start-form']}`} onSubmit={flagSubmitHandler}>
                            <Form.Group className="mb-3" controlId="formBasic">
                                <Form.Label className={styles['form-label']}>Flag</Form.Label>
                                <Form.Control
                                    className={styles['control-input']}
                                    style={{ backgroundColor: "#111", color: "white" }}
                                    onChange={flagChangeHandler}
                                    value={flagValue}
                                    type="text"
                                    placeholder="Paste your flag here"
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                            <div className={styles['button-div']}>
                                <Button aria-label="flagSubmitButton" className={`${styles['form-button-red']} `} variant="custom" type="submit">
                                    submit Flag
                                </Button>
                            </div>

                        </Form>}
                    {/* tu powinien być wartunek ze nie jest visible  */}
                    {!challengeError && authCTX.role === 'ROLE_CTF_ADMIN' && <Form className={`${styles['start-form']}`} onSubmit={challengeUpdateSubmitHandler}>
                        <MySwitch checked={isVisible} onClick={isVisibleSwitchHandler} label="isVisible" />
                        <div className={styles['button-div']}>
                            <Button aria-label="flagSubmitButton" className={`${styles['form-button-red']} `} variant="custom" type="submit">
                                Update challenge!
                            </Button>
                        </div>

                    </Form>}

                    {flagStatus === 'completed' && flagError && flagValidityOutput.header}
                    {flagStatus === 'completed' && !flagError && flagValidityOutput.header}
                    {challengeStatus === 'completed' && !challengeError && <div className={styles['button-div']}>
                        <Button onClick={onClickBackToChallengesHandler} aria-label="ChallengesBackButton" className={`${styles['form-button']} `} variant="custom" type="submit">
                            back to challenges
                        </Button>
                    </div>}

                </>
            }
        </Container >

    )
}
export default Challenge;