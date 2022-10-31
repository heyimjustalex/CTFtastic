import React from "react";
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState, useCallback } from 'react';
import useHttp from '../hooks/use-http';
import { getUser } from '../lib/api';
import LoadingRing from './UI/LoadingRing';
import { AuthContext } from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import styles from "./User.module.css"
import { Button, Container } from "react-bootstrap";


const User = () => {
    const { sendRequest, data, status, error } = useHttp(getUser);
    const [output, setOutput] = useState({});
    const authCTX = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate()
    const onClickBackToTeamsHandler = () => {
        navigate(-1);
    }

    useEffect(() => {
        const token = authCTX.token;
        const teamData = {
            token: token,
            userId: id
        }

        sendRequest(teamData);

    }, [sendRequest, id, authCTX.token])

    useEffect(() => {

        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (status === 'completed' && !error) {

            const output =
                <>
                    <div className={`${styles['output-content-container']}`}>

                        <h4 className={styles['team-header']}>Team: <p> {data.nameTeam} </p></h4>
                        {data.website ? <h4 className={styles['team-header']}>Website: <p>  {data.website}</p></h4> : ""}
                        {data.website ? <h4 className={styles['team-header']}>Affiliation:  <p> {data.affiliation}</p></h4> : ""}

                    </div>

                </>

            setOutput({ header: 'User: ' + data.name, content: output });
        }

        else if (status === 'completed' && error) {
            setOutput({ header: 'Error occured:', content: error });

        }

    }, [status, error, setOutput, data]);

    return (
        <Container className={`${styles['main']} d-flex flex-column`}>

            {status === 'completed' && !error && output.header}
            {status === 'completed' && !error && output.content}
            {status === 'pending' && <h3 className={styles['blue-header']}>{output.header}</h3>}
            {status === 'pending' && output.content}

            {status === 'completed' && error &&
                <Container className={`${styles['output-content-container']}`}>
                    <h3 className={styles['red-header']}>{output.content}</h3>
                </Container>}
            {status === 'completed' && error && !authCTX.isLoggedIn &&
                <Container className={`${styles['output-content-container']}`}>
                    <h3 className={styles['red-header']}>Log in to see details</h3>
                </Container>}

            {status === 'completed' && !error && <div className={styles['button-div']}>
                <Button onClick={onClickBackToTeamsHandler} aria-label="TeamsBackButton" className={`${styles['form-button']} `} variant="custom" type="submit">
                    back
                </Button>
            </div>}
        </Container >
    )
}
export default User;