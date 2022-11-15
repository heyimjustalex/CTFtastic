import React from "react";
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import { getChallenge, sendFlag, updateChallengeVisiblity, buildChallenge, getBuildState, getContainerState } from '../lib/api';
import LoadingRing from './UI/LoadingRing';
import { AuthContext } from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import styles from "./Challenge.module.css"
import { Button, Container, Form } from "react-bootstrap";
import useInput from "../hooks/use-input";
import MySwitch from "./UI/SwitchBox";

const OPERATOR_ADDRESS = process.env.REACT_APP_OPERATOR_ADDRESS;

const Challenge = () => {
    const { sendRequest: sendRequestGetChallenge, data: challengeData, status: challengeStatus, error: challengeError } = useHttp(getChallenge);
    const { sendRequest: sendRequestUpdateVisiblity, data: updateVisiblityflagData, status: updateVisiblityStatus, error: updateVisiblityError } = useHttp(updateChallengeVisiblity);
    const { sendRequest: sendRequestFlag, data: flagData, status: flagStatus, error: flagError } = useHttp(sendFlag);
    const { sendRequest: sendRequestBuildChallenge, data: buildChallengeData, status: buildChallengeStatus, error: buildChallengeError } = useHttp(buildChallenge);
    const { sendRequest: sendRequestGetBuildChange, data: getBuildChangeData, status: getBuildChangeStatus, error: getBuildChangeError } = useHttp(getBuildState);
    const { sendRequest: sendRequestGetContainersStatus, status: getContainersStatusStatus, error: getContainersStatusError, data: getContainersStatusData } = useHttp(getContainerState);
    const [output, setOutput] = useState({});
    const [flagValidityOutput, setflagValidityOutput] = useState({});
    const [updateVisibilityOutput, setUpdateVisibilityOutput] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [isChallengeBuildOutput, setIsChallengeBuildOutput] = useState({});
    const [dockerfileBuildState, setDockerfileBuildState] = useState(null);
    const [buildStateOutput, setBuildStateOutput] = useState({});
    const [startedContainersStateOutput, setStartedContainersStateOutput] = useState({})
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
    const challengeBuildHandler = (event) => {
        event.preventDefault()
        const data = {
            token: authCTX.token,
            challengeId: id
        }
        sendRequestBuildChallenge(data)
    }

    useEffect(() => {
        if (dockerfileBuildState !== 'done' && authCTX.role === 'ROLE_CTF_ADMIN') {

            const data = {
                challId: id,
                token: authCTX.token
            }

            const intervalId = setInterval(() => {
                sendRequestGetBuildChange(data)
            }, [5000])

            return () => {
                clearInterval(intervalId)
            }
        }
    }, [authCTX.token, dockerfileBuildState, id, sendRequestGetBuildChange, setDockerfileBuildState, authCTX.role])

    useEffect(() => {
        if (dockerfileBuildState !== 'done' && authCTX.role === 'ROLE_CTF_ADMIN') {

            const data = {
                challId: id,
                token: authCTX.token
            }
            sendRequestGetBuildChange(data)

        }
    }, [authCTX.role, authCTX.token, dockerfileBuildState, id, sendRequestGetBuildChange])

    useEffect(() => {
        if (authCTX.role !== "ROLE_CTF_ADMIN" && challengeData ? challengeData ? true : false : false) {

            const data = {
                challName: challengeData.name,
                token: authCTX.token,
                teamName: authCTX.teamName
            }
            sendRequestGetContainersStatus(data)

        }
    }, [authCTX.role, authCTX.teamName, authCTX.token, challengeData, sendRequestGetContainersStatus])

    useEffect(() => {
        const token = authCTX.token;
        const challengeData = {
            token: token,
            challengeId: id
        }

        sendRequestGetChallenge(challengeData);

    }, [sendRequestGetChallenge, id, authCTX.token])

    useEffect(() => {

        if (getBuildChangeStatus === 'pending') {
            setBuildStateOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (getBuildChangeStatus === 'completed' && !getBuildChangeError) {
            const dState = getBuildChangeData.dockerfileBuildState
            const content = dState !== 'done' ? <><p>Retrying:</p> <div><LoadingRing /></div></> : ""
            setDockerfileBuildState(dState)
            setBuildStateOutput({ header: `Building state: ${dState} `, content: content });
        }

        else if (getBuildChangeStatus === 'completed' && getBuildChangeError) {
            setBuildStateOutput({ header: 'Checking build state failed', content: <p>{getBuildChangeError}</p> });
        }

    }, [getBuildChangeData, getBuildChangeError, getBuildChangeStatus]);
    useEffect(() => {

        if (getContainersStatusStatus === 'pending') {
            setStartedContainersStateOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (getContainersStatusStatus === 'completed' && !getContainersStatusError) {

            const containerState = getContainersStatusData !== null ? getContainersStatusData.containerState ? true : false : false;
            setStartedContainersStateOutput({ header: `Starting state: ${containerState} `, content: "" });
        }

        else if (getContainersStatusStatus === 'completed' && getContainersStatusError) {
            setStartedContainersStateOutput({ header: 'Checking start state failed', content: <p>{getContainersStatusError}</p> });
        }

    }, [getContainersStatusData, getContainersStatusError, getContainersStatusStatus]);
    useEffect(() => {

        if (challengeStatus === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (challengeStatus === 'completed' && !challengeError) {

            challengeData.container = challengeData.link;
            const output =
                <>
                    <div className={`${styles['output-content-container']}`}>
                        <h4 className={styles['challenge-header']}>Category: <p> {challengeData.category}</p></h4>
                        <h4 className={styles['challenge-header']}>Points: <p> {challengeData.points} </p></h4>
                        {/* {challengeData.file !== null && <h4 className={styles['challenge-header']}>File link:  <p> {challengeData.file}</p></h4>} */}
                        {challengeData.container !== null && <h4 className={styles['challenge-header']}>Container link:  <p><a className={styles['container-link']} rel="noreferrer" target="_blank" href={String(OPERATOR_ADDRESS) + challengeData.link}> {challengeData.link}</a></p></h4>}

                    </div>
                </>
            setIsVisible(challengeData.isVisible)
            setOutput({ header: challengeData.name, content: output });
        }

        else if (challengeStatus === 'completed' && challengeError) {
            setOutput({ header: 'Error when fetching challenge', content: challengeError });

        }

    }, [challengeStatus, challengeError, setOutput, challengeData]);

    useEffect(() => {

        if (buildChallengeStatus === 'pending') {
            setIsChallengeBuildOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (buildChallengeStatus === 'completed' && !buildChallengeError) {

            setDockerfileBuildState(buildChallengeData.dockerfileBuildState)
            setIsChallengeBuildOutput({ header: "Building request send successfully!", content: "Wait until building done..." });
        }

        else if (buildChallengeStatus === 'completed' && buildChallengeError) {
            setIsChallengeBuildOutput({ header: 'Request image building failed', content: <p>{buildChallengeError}</p> });
        }

    }, [buildChallengeData, buildChallengeError, buildChallengeStatus]);



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

            setUpdateVisibilityOutput({ header: "Success!", content: <p>Challenge updated!</p> });
        }

        else if (updateVisiblityStatus === 'completed' && updateVisiblityError) {
            setUpdateVisibilityOutput({ header: 'Update failed...', content: <p> {updateVisiblityError}</p> });
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


                    {!challengeError && authCTX.role === 'ROLE_CTF_ADMIN' && <Form className={`${styles['start-form']}`} onSubmit={challengeUpdateSubmitHandler}>
                        <MySwitch checked={isVisible} onClick={isVisibleSwitchHandler} label={isVisible ? "isVisible" : "isInvisible"} />
                        <div className={styles['button-div']}>
                            <Button aria-label="flagSubmitButton" className={`${styles['form-button-red']} `} variant="custom" type="submit">
                                Update challenge!
                            </Button>
                        </div>

                    </Form>}

                    {!challengeError
                        && authCTX.role === 'ROLE_CTF_ADMIN' && challengeData.hasDockerfile &&
                        <Form className={`${styles['start-form']}`} onSubmit={challengeBuildHandler} >
                            <div className={styles['button-div']}>

                                <Button aria-label="containerStateSubmitButton" disabled={dockerfileBuildState !== 'done' ? false : false} className={`${styles['form-button-green']} `} variant="custom" type="submit">
                                    Build Image
                                </Button>

                            </div>
                        </Form>
                    }

                    {challengeStatus === 'completed' && !challengeError && <div className={styles['button-div']}>
                        <Button onClick={onClickBackToChallengesHandler} aria-label="ChallengesBackButton" className={`${styles['form-button']} `} variant="custom" type="submit">
                            back to challenges
                        </Button>
                    </div>}


                    {flagStatus === 'completed' && <Container style={{ margin: '1em' }} className={`${styles['output-content-container']}`}>
                        <h3 className={styles[`${flagError ? "red-header" : "blue-header"}`]}>{flagValidityOutput.header}</h3>
                    </Container>}

                    {buildChallengeStatus !== null && <Container style={{ margin: '0.2em' }} className={`${styles['output-content-container']}`}>
                        <h3 className={styles[`${buildChallengeError ? "red-header" : "blue-header"}`]}>{isChallengeBuildOutput.header}</h3>
                    </Container>}
                    {(buildChallengeStatus !== null) && <Container style={{ margin: '0.2em' }}
                        className={`${styles['output-content-container']}`}>
                        {isChallengeBuildOutput.content}
                    </Container>}


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

                        {!challengeError
                            && authCTX.role === 'ROLE_CTF_ADMIN' && challengeData.hasDockerfile && buildStateOutput.header}
                        {!challengeError
                            && authCTX.role === 'ROLE_CTF_ADMIN' && challengeData.hasDockerfile && buildStateOutput.content}

                        {authCTX.role !== 'ROLE_CTF_ADMIN'
                            && (Boolean(challengeData ? challengeData.hasDockerfile ? true : false : false))
                            && <Container style={{ margin: '0.2em' }}
                                className={`${styles['output-content-container']}`}>
                                <h3 className={styles[`${getContainersStatusError ? "red-header" : "blue-header"}`]}>{startedContainersStateOutput.header}</h3>
                            </Container>}

                    </div>

                </>
            }
        </Container >

    )
}
export default Challenge;