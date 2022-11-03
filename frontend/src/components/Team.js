import React from "react";
import { useParams } from 'react-router-dom'
import { useContext, useEffect, useState, useCallback } from 'react';
import useHttp from '../hooks/use-http';
import { getTeam } from '../lib/api';
import LoadingRing from './UI/LoadingRing';
import { AuthContext } from '../store/auth-context';
import { useNavigate } from 'react-router-dom';
import styles from "./Team.module.css"
import { Button, Container } from "react-bootstrap";


const Team = () => {
    const { sendRequest, data, status, error } = useHttp(getTeam);
    const [output, setOutput] = useState({});
    const authCTX = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate()
    const onClickBackToTeamsHandler = () => {

        navigate('/teams');
    }


    const handleUsersRowClick = useCallback((id) => {
        if (authCTX.isLoggedIn) {
            navigate(`/users/${id}`);
        }

    }, [navigate, authCTX.isLoggedIn])

    const handleUsersDeleteClick = useCallback((userId) => {

        const dataTemp = {
            token: authCTX.token,
            userId: userId
        };
        console.log("dataTemp", dataTemp)

        // sendRequestDeleteFromTeam(dataTemp);
    }, [authCTX.token])

    const isItMyTeam = authCTX.idTeam === id;
    console.log("idTeam", authCTX.idTeam);
    console.log("id", id);
    console.log("IS MY TEAM", isItMyTeam);


    useEffect(() => {
        const token = authCTX.token;
        const teamData = {
            token: token,
            teamId: id
        }

        sendRequest(teamData);

    }, [sendRequest, id, authCTX.token])

    useEffect(() => {

        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (status === 'completed' && !error) {

            let teamMembers = null;
            let iterator = 0;
            if (data.users) {
                teamMembers = data.users.map((element) => {
                    iterator++;
                    return <tr className={styles['tr-hover-when-loggedin']}
                        key={element.id}
                    >
                        <td
                            onClick={() => handleUsersRowClick(element.id)}

                        >{iterator}</td>
                        <td
                            onClick={() => handleUsersRowClick(element.id)}


                        >{element.name}</td>
                        {((authCTX.role === 'ROLE_TEAM_CAPITAN' && isItMyTeam) || authCTX.role === 'ROLE_CTF_ADMIN') && < td
                            onClick={() => handleUsersDeleteClick(element.id)}
                            className={styles['x-sign-td']}>X</td>
                        }
                    </tr >


                })
            }
            const output =
                <>
                    <div className={`${styles['output-content-container']}`}>

                        <h4 className={styles['team-header']}>Points: <p> {data.points} </p></h4>
                        <h4 className={styles['team-header']}>Website: <p>  {data.website}</p></h4>
                        <h4 className={styles['team-header']}>Affiliation:  <p> {data.affiliation}</p></h4>


                    </div>
                    <div>
                        {teamMembers == null && <h4 className={styles['red-header']}>This team has no members yet</h4>}
                        {teamMembers !== null && <h4>Members:</h4>}
                        {teamMembers !== null && <table>
                            <tbody>
                                {teamMembers}
                            </tbody>
                        </table>}
                    </div>
                </>

            setOutput({ header: 'Team: ' + data.name + ' details', content: output });
        }

        else if (status === 'completed' && error) {
            setOutput({ header: 'Error occured:', content: error });

        }

    }, [status, error, setOutput, data, authCTX.isLoggedIn, handleUsersRowClick]);

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
                    back to teams
                </Button>
            </div>}
        </Container >
    )
}
export default Team;