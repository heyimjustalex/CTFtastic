import React from "react";
import { useContext, useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import { addChallenge } from '../lib/api';
import LoadingRing from './UI/LoadingRing';
import { AuthContext } from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import styles from "./AddChallenge.module.css"
import { Button, Container, Form } from "react-bootstrap";
import useInput from "../hooks/use-input";
import { descriptionValidator, titleValidator, categoryValidator, flagValidator, pointsValidator } from "./validators";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import InputButton from "./UI/InputButton";


const AddChallenge = () => {
    const { sendRequest: sendRequestAddChallenge, data: challengeAddData, status: challengeAddStatus, error: challengeAddError } = useHttp(addChallenge);
    const [isVisibleValue, setIsVisibleValue] = useState(true);
    const [isFlagCaseSensitiveValue, setIsFlagCaseSensitiveValue] = useState(true);
    const [output, setOutput] = useState({});
    const authCTX = useContext(AuthContext);
    const navigate = useNavigate()
    const [filename, setFilename] = useState(null);

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
            value: categoryValue,
            isTouched: categoryIsTouched,
            isValid: categoryIsValid,
            hasError: categoryHasError,
            valueChangeHandler: categoryChangeHandler,
            valueBlurHandler: categoryBlurHandler,
            reset: categoryReset
        } = useInput(categoryValidator)

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

    const
        {
            value: flagValue,
            isTouched: flagIsTouched,
            isValid: flagIsValid,
            hasError: flagHasError,
            valueChangeHandler: flagChangeHandler,
            valueBlurHandler: flagBlurHandler,
            reset: flagReset
        } = useInput(flagValidator)

    const
        {
            value: pointsValue,
            isTouched: pointsIsTouched,
            isValid: pointsIsValid,
            hasError: pointsHasError,
            valueChangeHandler: pointsChangeHandler,
            valueBlurHandler: pointsBlurHandler,
            reset: pointsReset
        } = useInput(pointsValidator)




    const isVisibleChangeHandler = (event) => {
        setIsVisibleValue((isVisible) => { return !isVisible });
        // console.log(isVisibleValue)
    }
    const isFlagCaseSensitiveChangeHandler = (event) => {
        setIsFlagCaseSensitiveValue((isFlagCaseSensitiveValue) => { return !isFlagCaseSensitiveValue });
    }




    const formIsValid =
        challengeNameIsValid &&
        challengeNameIsTouched &&
        categoryIsValid &&
        categoryIsTouched &&
        descriptionIsValid &&
        descriptionIsTouched &&
        flagIsValid &&
        flagIsTouched &&
        pointsIsValid &&
        pointsIsTouched;



    useEffect(() => {

        if (challengeAddStatus === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (challengeAddStatus === 'completed' && !challengeAddError) {


            flagReset();
            pointsReset();
            categoryReset();
            challengeNameReset();
            descriptionReset();
            setFilename(null);
            setOutput({ header: "Success!", content: "Challenge Added!" });
        }

        else if (challengeAddStatus === 'completed' && challengeAddError) {
            setOutput({ header: 'Failed!', content: "Error: " + challengeAddError });

        }

    }, [challengeAddStatus, challengeAddError, setOutput, challengeAddData]);

    const [dockerfileState, setDockerfileState] = useState(null);
    const challengeAddSubmitHandler = (event) => {
        event.preventDefault();
        const requestData = {
            token: authCTX.token,
            name: challengeNameValue,
            description: descriptionValue,
            category: categoryValue,
            points: +pointsValue,
            flag: flagValue,
            isCaseSensitive: isFlagCaseSensitiveValue,
            isVisible: isVisibleValue,
            dockerfile: dockerfileState
        }
        // console.log(requestData);
        sendRequestAddChallenge(requestData)

    }
    let textColor = "";
    if (challengeAddStatus === 'completed' && !challengeAddError) {
        textColor = 'blueText';

    }
    if (challengeAddStatus === 'completed' && challengeAddError) {
        textColor = 'redText';
    }


    return (


        <Container className={`${styles['main']} d-flex flex-column`}>

            {(!authCTX.isLoggedIn || authCTX.role !== 'ROLE_CTF_ADMIN') &&
                <Container className={`${styles['output-content-container']}`}>
                    <h3 className={styles['red-header']}>You have to be logged in as CTF admin</h3>
                </Container>}


            {(authCTX.isLoggedIn && authCTX.role === 'ROLE_CTF_ADMIN') &&
                <>
                    <Form className={`${styles['start-form']}`} onSubmit={challengeAddSubmitHandler}>
                        <Form.Group className="mb-3" controlId="formBasic">
                            <Form.Label className={styles['form-label']}>Name</Form.Label>
                            <Form.Control
                                className={styles['control-input']}
                                isValid={challengeNameIsValid && challengeNameIsTouched}
                                isInvalid={(!challengeNameIsValid && challengeNameIsTouched)}
                                style={{ backgroundColor: "#000", color: "white" }}
                                onChange={challengeNameChangeHandler}
                                value={challengeNameValue}
                                type="text"
                                placeholder="Challenge name"
                            />
                            <Form.Text className={styles["text-info"]}>
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="categoryId">
                            <Form.Label className={styles['form-label']}>Category</Form.Label>
                            <Form.Control
                                className={styles['control-input']}
                                isValid={categoryIsValid && categoryIsTouched}
                                isInvalid={(!categoryIsValid && categoryIsTouched)}
                                onChange={categoryChangeHandler}
                                onBlur={categoryBlurHandler}
                                value={categoryValue}
                                type="text"
                                placeholder="Enter challenge category"

                            />
                            <Form.Text className={styles["text-info"]}>
                                {/* Max 500 chars */}
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
                                placeholder="Enter challenge description"
                                value={descriptionValue}

                            />
                            <Form.Text className={styles["text-info"]}>
                                Max 500 chars
                            </Form.Text>
                        </Form.Group>

                        <InputButton filename={filename} setFilename={setFilename} label={"Upload Dockerfile"} setFile={setDockerfileState} />

                        <Form.Group className="mb-3" controlId="categoryId">
                            <Form.Label className={styles['form-label']}>Points</Form.Label>
                            <Form.Control
                                className={styles['control-input']}
                                isValid={pointsIsValid && pointsIsTouched}
                                isInvalid={(!pointsIsValid && pointsIsTouched)}
                                onChange={pointsChangeHandler}
                                onBlur={pointsBlurHandler}
                                value={pointsValue}
                                type="text"
                                placeholder="Enter points team gets for this challenge"

                            />
                            <Form.Text className={styles["text-info"]}>
                                {/* Max 500 chars */}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="categoryId">
                            <Form.Label className={styles['form-label']}>Flag</Form.Label>
                            <Form.Control
                                className={styles['control-input']}
                                isValid={flagIsValid && flagIsTouched}
                                isInvalid={(!flagIsValid && flagIsTouched)}
                                onChange={flagChangeHandler}
                                onBlur={flagBlurHandler}
                                value={flagValue}
                                type="text"
                                placeholder="Enter flag of this challenge"

                            />
                            <Form.Text className={styles["text-info"]}>
                                {/* Max 500 chars */}
                            </Form.Text>
                        </Form.Group>
                        <FormControlLabel control={
                            <Checkbox
                                defaultChecked
                                onChange={isVisibleChangeHandler}
                                sx={{
                                    '& .MuiSvgIcon-root': { fontSize: '1em' }, color: '#FF304E',
                                    '&.Mui-checked': {
                                        color: '#FF304E'
                                    },
                                }}
                            />} label={
                                <Typography
                                    className={styles['form-label-checkbox']}>
                                    isVisible (after ctf starts)
                                </Typography>}>

                        </FormControlLabel>


                        <FormControlLabel control={
                            <Checkbox
                                defaultChecked
                                onChange={isFlagCaseSensitiveChangeHandler}
                                sx={{
                                    '& .MuiSvgIcon-root': { fontSize: '1em' }, color: '#FF304E',
                                    '&.Mui-checked': {
                                        color: '#FF304E'
                                    },
                                }}
                            />} label={
                                <Typography
                                    className={styles['form-label-checkbox']}>
                                    flagCaseSensitive
                                </Typography>}>

                        </FormControlLabel>

                        <div className={styles['button-div']}>
                            <Button aria-label="challengeSubmitButton"
                                disabled={!formIsValid}
                                className={`${styles['form-button-red']} `}
                                variant="custom"
                                type="submit">
                                Add challenge
                            </Button>
                        </div>
                    </Form>


                    <div className={styles['button-div']}>
                        <Button onClick={onClickBackToChallengesHandler} aria-label="ChallengesBackButton" className={`${styles['form-button']} `} variant="custom" type="submit">
                            back to challenges
                        </Button>
                    </div>
                    <div className={styles['output-container']}>

                        {!(challengeAddStatus === 'pending') &&
                            <h1 className={styles[textColor]}>{output ? output.header : ''}</h1>}

                        {!(challengeAddStatus === 'pending') && <h1> {output ? output.content : ''}</h1>}

                        {challengeAddStatus === 'pending' && <LoadingRing />}
                    </div>

                </>}

        </Container >

    )
}
export default AddChallenge;