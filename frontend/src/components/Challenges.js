import { useCallback, useContext, useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import { getChallenges, startStopContainers, getContainersState } from "../lib/api";
import Container from 'react-bootstrap/Container';
import styles from './Challenges.module.css';
import LoadingRingTable from "./UI/LoadingRingTable";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { AuthContext } from '../store/auth-context';
import { Button, Form } from "react-bootstrap";
import LoadingRing from "./UI/LoadingRing";

const Challenges = () => {

    const [output, setOutput] = useState({});
    const { sendRequest, status, error, data } = useHttp(getChallenges);
    const { sendRequest: sendRequestStartContainers, status: startContainersStatus, error: startContainersError, data: startContainersData } = useHttp(startStopContainers);

    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const authCTX = useContext(AuthContext);
    const [startedContainersState, setStartedContainersState] = useState(null)
    const [startedContainersStateOutput, setStartedContainersStateOutput] = useState({})
    const elementsPerPage = 6;
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {

        const pagData = { page: currentPageNumber, size: elementsPerPage, token: authCTX.token };
        sendRequest(pagData);

    }, [sendRequest, currentPageNumber, authCTX.token])

    const navigate = useNavigate();
    const handleRowClick = useCallback((id) => {
        if (authCTX.isLoggedIn) {
            navigate(`/challenges/${id}`);
        }

    }, [navigate, authCTX.isLoggedIn])

    const startStopContainerHandler = (e) => {
        e.preventDefault();
        const startOrStopValue = startedContainersState !== 'done' ? 'start' : 'stop';
        const data = {
            teamName: authCTX.teamName,
            token: authCTX.token,
            startOrStopValue: startOrStopValue
        }
        sendRequestStartContainers(data)

    }

    useEffect(() => {

        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRingTable /> });
        }

        else if (status === 'completed' && !error) {
            setTotalPages(data.totalPages);
            let iterator = currentPageNumber * elementsPerPage;
            const dataWithSelector = data.elements.map((element) => {
                iterator += 1
                return <tr
                    className={authCTX.isLoggedIn ? styles['tr-hover-when-loggedin'] : ''}
                    key={element.id}
                    onClick={() => handleRowClick(element.id)}>
                    <td className={styles['element-id']}>{iterator}</td>
                    <td>{element.name}</td>
                    <td>{element.category}</td>
                    <td>{element.points}</td>
                </tr>

            });

            setOutput({ header: 'Success!', content: dataWithSelector });
        }

        else if (status === 'completed' && error) {
            setOutput({ header: 'Error occured:', content: error });

        }

    }, [status, error, setOutput, data, handleRowClick, authCTX.isLoggedIn, currentPageNumber]);


    // useEffect(() => {
    //     if (startedContainersState !== 'done' && authCTX.role !== "ROLE_CTF_ADMIN" && (data ? data.hasContainers ? true : false : false)) {

    //         const data = {
    //             token: authCTX.token
    //         }

    //         const intervalId = setInterval(() => {
    //             sendRequestGetContainersStatus(data)
    //         }, [4000])

    //         return () => {
    //             clearInterval(intervalId)
    //         }
    //     }
    // }, [authCTX.role, authCTX.token, sendRequestGetContainersStatus, startedContainersState, data])





    useEffect(() => {

        if (startContainersStatus === 'pending') {
            setStartedContainersStateOutput({ header: 'Loading...', content: <LoadingRing /> });

        }

        else if (startContainersStatus === 'completed' && !startContainersError) {


            setStartedContainersState(startContainersData.containerState)
            // console.log(startContainersData.containerState)
            setStartedContainersStateOutput({ header: "Starting request send successfully!", content: "" });
        }

        else if (startContainersStatus === 'completed' && startContainersError) {

            setStartedContainersStateOutput({ header: 'Request container starting failed', content: <p>{startContainersError}</p> });
        }

    }, [startContainersData, startContainersError, startContainersStatus]);

    const onChangePageHandler = ({ selected }) => {
        setCurrentPageNumber(selected);
    }

    return (

        <Container className={`${styles['main']} d-flex flex-column`}>

            <table className={styles['table-elements']}>
                {status === 'completed' && !error && data.elements.length !== 0 &&
                    <thead>
                        <tr className={styles['table-header']}>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th className={styles["points"]}>Points</th>
                        </tr>
                    </thead>
                }
                <tbody>
                    {status === 'pending' && <tr><td style={{ border: 'none' }}><h3 className={styles['loading-header']}>{output.header}</h3></td></tr>}
                    {status === 'pending' && output.content}
                    {status === 'completed' && !error && (data ? data.elements ? data.elements.length > 0 ? true : false : false : false) && output.content}
                    {status === 'completed' && error && <tr><td style={{ border: 'none' }}><h3 className={styles['redText']}>No challenges found! </h3></td></tr>}

                </tbody>
            </table>


            {
                (authCTX.role === 'ROLE_TEAM_CAPITAN' || authCTX.role === 'ROLE_USER_WITH_TEAM')
                &&
                status === 'completed' && !error
                && (data ? data.elements ? data.elements.length > 0 ? true : false : false : false)
                && data.hasContainers &&
                <Form className={`${styles['start-form']}`} onSubmit={startStopContainerHandler} >
                    <div className={styles['button-div']}>

                        <Button aria-label="containerStateSubmitButton" className={startedContainersState !== 'done' ? styles['form-button-green'] : styles['form-button-red']} variant="custom" type="submit">
                            {startedContainersState !== 'done' ? "Start containers!" : "Stop containers!"}
                        </Button>

                    </div>
                </Form>
            }


            {
                status === 'completed' && !error && (Boolean(data.elements.length))
                && (Boolean(totalPages > 1)) && < Pagination pageCount={totalPages} currentPage={currentPageNumber} onChangePage={onChangePageHandler}></Pagination>
            }
            {
                status === 'completed' &&
                !error &&
                !data.elements.length &&
                <div className={styles['output-container']}> <h3 className={styles['redText']}>No challenges added or YOU DONT HAVE A TEAM! Join/Create team first!</h3></div>
            }

            {startContainersStatus === 'completed' &&
                authCTX.role !== 'ROLE_CTF_ADMIN' && startContainersStatus !== null && <Container style={{ margin: '0.2em' }} className={`${styles['output-content-container']}`}>
                    <h3 className={styles[`${startContainersError ? "red-header" : "blue-header"}`]}>{startedContainersStateOutput.header}</h3>
                </Container>}

            {startContainersStatus === 'pending' &&
                authCTX.role !== 'ROLE_CTF_ADMIN' && startContainersStatus !== null && <Container style={{ margin: '0.2em' }} className={`${styles['output-content-container']}`}>
                    <h3 className={styles[`${startContainersError ? "red-header" : "blue-header"}`]}>{startedContainersStateOutput.header}</h3>

                </Container>}
            {startContainersStatus === 'pending' &&
                authCTX.role !== 'ROLE_CTF_ADMIN' && startContainersStatus !== null && <Container style={{ margin: '0.2em' }} className={`${styles['output-content-container']}`}>  {startedContainersStateOutput.content} </Container>}




        </Container >
    )
}

export default Challenges;