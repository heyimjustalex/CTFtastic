import React from "react";
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import { getChallenge, sendFlag } from '../lib/api';
import LoadingRing from './UI/LoadingRing';
import { AuthContext } from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import styles from "./AddChallenge.module.css"
import { Button, Container, Form } from "react-bootstrap";
import useInput from "../hooks/use-input";
import { descriptionValidator, titleValidator } from "./validators";


const AddChallenge = () => {
    const { sendRequest: sendRequestGetChallenge, data: challengeData, status: challengeStatus, error: challengeError } = useHttp(getChallenge);

    const { sendRequest: sendRequestFlag, data: flagData, status: flagStatus, error: flagError } = useHttp(sendFlag);
    const [output, setOutput] = useState({});
    const authCTX = useContext(AuthContext);
    const navigate = useNavigate()

    const onClickBackToChallengesHandler = () => {
        navigate('/challenges');
    }

    const
        { value: challengeNameValue,
            isTouched: challengeNameIsTouched,
            isValid: challengeNameIsValid,
            hasError: challengeNameHasError,
            valueChangeHandler: challengeNameChangeHandler,
            valueBlurHandler: challengeNameBlurHandler,
            reset: challengeNameReset
        } = useInput(titleValidator)

    const
        {
            value: descriptionValue,
            isTouched: descriptionIsTouched,
            isValid: descriptionIsValid,
            hasError: descriptionHasError,
            valueChangeHandler: descriptionChangeHandler,
            valueBlurHandler: descriptionBlurHandler,
            reset: descriptionReset
        } = useInput(descriptionValidator)


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

    const challengeSubmitHandler = () => {

    }

    return (

        <Container className={`${styles['main']} d-flex flex-column`}>
            {(!authCTX.isLoggedIn || authCTX.role !== 'ROLE_CTF_ADMIN') &&
                <Container className={`${styles['output-content-container']}`}>
                    <h3 className={styles['red-header']}>You have to be logged in as CTF admin</h3>
                </Container>}


            {(authCTX.isLoggedIn && authCTX.role === 'ROLE_CTF_ADMIN') &&

                <>
                    <Container className={`${styles['output-content-container']}`}>
                        <h3 className={styles['red-header']}>{output.content}</h3>
                    </Container>

                    <Form className={`${styles['start-form']}`} onSubmit={challengeSubmitHandler}>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label className={styles['form-label']}>Name</Form.Label>
                            <Form.Control
                                className={styles['control-input']}
                                style={{ backgroundColor: "#000", color: "white" }}
                                onChange={challengeNameChangeHandler}
                                value={challengeNameValue}
                                type="text"
                                placeholder="Challenge name"
                            />
                            <Form.Text className={styles["text-info"]}>
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="descriptionId">
                            <Form.Label className={styles['form-label']}>Description</Form.Label>
                            <Form.Control
                                className={styles['control-input']}
                                isValid={descriptionIsValid && descriptionIsTouched}
                                isInvalid={(!descriptionIsValid && descriptionIsTouched)}
                                onBlur={descriptionBlurHandler} onChange={descriptionChangeHandler}
                                as="textarea"
                                rows={5}
                                placeholder="Enter CTF description"
                                value={descriptionValue}

                            />
                            <Form.Text className={styles["text-info"]}>
                                Max 500 chars
                            </Form.Text>
                        </Form.Group>


                        <div className={styles['button-div']}>
                            <Button aria-label="flagSubmitButton" className={`${styles['form-button-red']} `} variant="custom" type="submit">
                                Add challenge to database
                            </Button>
                        </div>
                    </Form>

                    <div className={styles['button-div']}>
                        <Button onClick={onClickBackToChallengesHandler} aria-label="ChallengesBackButton" className={`${styles['form-button']} `} variant="custom" type="submit">
                            back to challenges
                        </Button>
                    </div>
                </>}

        </Container >

    )
}
export default AddChallenge;