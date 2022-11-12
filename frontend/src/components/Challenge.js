import React from "react";
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import { getChallenge, sendFlag, updateChallengeVisiblity, updateStartStopChallengeContainer } from '../lib/api';
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
    const { sendRequest: sendRequestUpdateContainerStartStop, data: updateContainerStartStopData, status: updateContainerStartStopStatus, error: updateContainerStartStopError } = useHttp(updateStartStopChallengeContainer);
    const [output, setOutput] = useState({});
    const [flagValidityOutput, setflagValidityOutput] = useState({});
    const [updateVisibilityOutput, setUpdateVisibilityOutput] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [isContainerStarted, setIsContainerStarted] = useState(null);
    const [isContainerStartedOutput, setIsContainerStartedOutput] = useState({});


    const authCTX = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate()
    const onClickBackToChallengesHandler = () => {
        navigate('/challenges');
    }
    const challengeUpdateSubmitHandler = (event) => {
        event.preventDefault();
        const data = { id: id, token: authCTX.token, isVisible: +isVisible }
        sendRequestUpdateVisiblity(data);
    }

    const isVisibleSwitchHandler = () => {
        setIsVisible((prev) => { return !prev })
    }
    const isContainerStartedSwitchHandler = () => {
        setIsContainerStarted((prev) => { return !prev })
    }


    // const containerStateUpdateSubmitHandler = (event) => {
    //     event.preventDefault();
    //     const data = { challId: id, token: authCTX.token, isContainerStarted: isContainerStarted }
    //     // sendRequestUpdateContainerStartStop(data)
    // }

    const containerStartStopSubmitHandler = () => {

        const data = { challId: id, token: authCTX.token, isContainerStarted: isContainerStarted }
        // sendRequestUpdateContainerStartStop(data);
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

            // challengeData.file = "na sztywno file link";
            challengeData.container = challengeData.link;


            const output =
                <>
                    <div className={`${styles['output-content-container']}`}>
                        <h4 className={styles['challenge-header']}>Category: <p> {challengeData.category}</p></h4>
                        <h4 className={styles['challenge-header']}>Points: <p> {challengeData.points} </p></h4>
                        {/* {challengeData.file !== null && <h4 className={styles['challenge-header']}>File link:  <p> {challengeData.file}</p></h4>} */}
                        {challengeData.container !== null && <h4 className={styles['challenge-header']}>Container link:  <p><a className={styles['container-link']} rel="noreferrer" target="_blank" href={"http://www.google.com" + challengeData.link}> {challengeData.link}</a></p></h4>}

                    </div>
                </>
            setIsVisible(challengeData.isVisible)
            // setIsContainerStarted(challengeData.hasContainerStarted!==null?true:null)
            setOutput({ header: challengeData.name, content: output });
        }

        else if (challengeStatus === 'completed' && challengeError) {
            setOutput({ header: 'Error when fetching challenge', content: challengeError });

        }

    }, [challengeStatus, challengeError, setOutput, challengeData]);

    useEffect(() => {

        if (updateContainerStartStopStatus === 'pending') {
            setIsContainerStartedOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (updateContainerStartStopStatus === 'completed' && !updateContainerStartStopError) {

            let output = "No container required for this challenge"
            const temp = updateStartStopChallengeContainer.isContainerStarted;
            if (temp !== null) {
                if (temp) {
                    output = "Container is started."
                }
                else {
                    output = "Container is shut down"
                }
            }

            setIsContainerStarted(updateStartStopChallengeContainer.isContainerStarted)
            setIsContainerStartedOutput({ header: "Success!", content: "Container state: " + output });
        }

        else if (updateContainerStartStopStatus === 'completed' && updateContainerStartStopError) {
            setIsContainerStartedOutput({ header: 'Updating container state error', content: updateContainerStartStopError });

        }

    }, [updateContainerStartStopError, updateContainerStartStopStatus]);



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
            flag: flagValue,
            token: authCTX.token
        };


        sendRequestFlag(dataTemp);
    }

    useEffect(() => {

        if (updateVisiblityStatus === 'pending') {
            setUpdateVisibilityOutput({ header: 'Updating challenge...', content: <LoadingRing /> });
        }

        else if (updateVisiblityStatus === 'completed' && !updateVisiblityError) {

            const output =
                <>
                    <div className={`${styles['output-content-container']}`}>
                        <h4 className={styles['challenge-header']}>Challenge updated!</h4>
                    </div>
                </>

            setUpdateVisibilityOutput({ header: "Success!", content: "Challenge updated!" });
        }

        else if (updateVisiblityStatus === 'completed' && updateVisiblityError) {


            setUpdateVisibilityOutput({ header: 'Update failed...', content: updateVisiblityError });

        }

    }, [updateVisiblityError, updateVisiblityStatus]);


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

            setflagValidityOutput({ header: "You have submitted proper flag. Congrats!", content: output });
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

                    {flagStatus === 'pending' && <h3 className={styles['blue-header']}>{flagValidityOutput.header}</h3>}

                    {flagStatus === 'pending' && flagValidityOutput.content}
                    {

                        ((flagStatus === 'completed' && flagError) || flagStatus === null)
                        && !challengeError
                        && authCTX.role !== 'ROLE_CTF_ADMIN'
                        && !challengeData.isSolved &&
                        <Form className={`${styles['start-form']}`} onSubmit={flagSubmitHandler}>
                            <Form.Group className="mb-3" controlId="formBasic">
                                <Form.Label className={styles['form-label']}>Flag</Form.Label>
                                <Form.Control
                                    className={styles['control-input']}
                                    style={{ backgroundColor: "#000", color: "white" }}
                                    onChange={flagChangeHandler}
                                    value={flagValue}
                                    type="text"
                                    placeholder="Paste your flag here"
                                />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                            <div className={styles['button-div']}>
                                <Button aria-label="flagSubmitButton"
                                    className={`${styles['form-button-red']} `}
                                    variant="custom"
                                    type="submit">
                                    submit Flag
                                </Button>
                            </div>

                        </Form>
                    }
                    {challengeData.isSolved && <Container style={{ margin: '2em' }} className={`${styles['output-content-container']}`}>
                        <h3 className={styles['red-header']}>Your team has already solved this challenge</h3>
                    </Container>}
                    {/* tu powinien być wartunek ze nie jest visible  */}
                    {!challengeError && authCTX.role === 'ROLE_CTF_ADMIN' && <Form className={`${styles['start-form']}`} onSubmit={challengeUpdateSubmitHandler}>
                        <MySwitch checked={isVisible} onClick={isVisibleSwitchHandler} label={isVisible ? "isVisible" : "isInvisible"} />
                        <div className={styles['button-div']}>
                            <Button aria-label="flagSubmitButton" className={`${styles['form-button-red']} `} variant="custom" type="submit">
                                Update challenge!
                            </Button>
                        </div>

                    </Form>}
                    {/* Tu powinny byc warutnki not ctf admin i isContaineSTarted not null (jesli nie ma wgle container w challengu) */}
                    {!challengeError && <Form className={`${styles['start-form']}`} onSubmit={containerStartStopSubmitHandler}>
                        <div className={styles['button-div']}>
                            <MySwitch checked={isContainerStarted} onClick={isContainerStartedSwitchHandler} label={isContainerStarted ? "Disable Container" : "Enable Container"} />

                            <Button aria-label="containerStateSubmitButton" className={`${styles['form-button-blue-small']} `} variant="custom" type="submit">
                                Update container state!
                            </Button>

                        </div>
                    </Form>
                    }



                    {flagStatus === 'completed' && <Container style={{ margin: '2em' }} className={`${styles['output-content-container']}`}>
                        <h3 className={styles[`${flagError ? "red-header" : "blue-header"}`]}>{flagValidityOutput.header}</h3>
                    </Container>}

                    {challengeStatus === 'completed' && !challengeError && <div className={styles['button-div']}>
                        <Button onClick={onClickBackToChallengesHandler} aria-label="ChallengesBackButton" className={`${styles['form-button']} `} variant="custom" type="submit">
                            back to challenges
                        </Button>
                    </div>}

                    <div className={`${styles['output-container']}`}>
                        {updateVisiblityStatus === 'completed' &&
                            !updateVisiblityError &&
                            <>
                                <h3 className={styles['blue-header']}>{updateVisibilityOutput.header}</h3>
                                {updateVisibilityOutput.content}
                            </>}
                        {updateVisiblityStatus === 'completed' &&
                            updateVisiblityError &&
                            <>
                                <h3 className={styles['red-header']}>{updateVisibilityOutput.header}</h3>
                                {updateVisibilityOutput.content}
                            </>}
                        {updateVisiblityStatus === 'pending' &&
                            <>
                                <h3 className={styles['blue-header']}>{updateVisibilityOutput.header}</h3>
                                {updateVisibilityOutput.content}
                            </>
                        }

                    </div>

                </>
            }
        </Container >

    )
}
export default Challenge;