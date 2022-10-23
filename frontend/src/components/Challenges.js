import { useCallback, useContext, useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import { getChallenges } from "../lib/api";
import Container from 'react-bootstrap/Container';
import styles from './Challenges.module.css';
import LoadingRingTable from "./UI/LoadingRingTable";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import { AuthContext } from '../store/auth-context';

const Challenges = () => {
    const [output, setOutput] = useState({});
    const { sendRequest, status, error, data } = useHttp(getChallenges);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const authCTX = useContext(AuthContext);

    const teamsPerPage = 6;
    // const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {

        const pagData = { page: currentPageNumber, size: teamsPerPage };
        sendRequest(pagData);

    }, [sendRequest, currentPageNumber])

    const navigate = useNavigate();
    const handleRowClick = useCallback((id) => {
        if (authCTX.isLoggedIn) {
            navigate(`/challenges/${id}`);
        }

    }, [navigate, authCTX.isLoggedIn])



    useEffect(() => {

        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRingTable /> });
        }

        else if (status === 'completed' && !error) {
            // setTotalElements(data.totalElements);
            setTotalPages(data.totalPages);

            const dataWithSelector = data.elements.map((element) => {
                return <tr className={authCTX.isLoggedIn ? styles['tr-hover-when-loggedin'] : ''} key={element.id} onClick={() => handleRowClick(element.id)}>
                    <td className={styles['element-id']}>{element.id}</td>
                    <td>{element.name}</td>
                    <td>{element.category}</td>
                    <td> {element.points}</td>
                </tr>

            });
            setOutput({ header: 'Success!', content: dataWithSelector });
        }

        else if (status === 'completed' && error) {
            setOutput({ header: 'Error occured:', content: error });

        }

    }, [status, error, setOutput, data, handleRowClick, authCTX.isLoggedIn]);


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
                    {status === 'completed' && !error && data.elements.length !== 0 && output.content}
                    {status === 'pending' && <tr><td style={{ border: 'none' }}><h3 className={styles['loading-header']}>{output.header}</h3></td></tr>}
                    {status === 'pending' && output.content}
                </tbody>
            </table>
            {status === 'completed' && error && <Container className={`${styles['output-content-container']}`}><h3 className={styles['error-header']}>{output.content}</h3></Container>}


            <Pagination pageCount={totalPages} onChangePage={onChangePageHandler}></Pagination>
            {status === 'completed' &&
                !error &&
                !data.elements.length &&
                <div className={styles['output-container']}> <h1 className={styles['redText']}>No challenges added!</h1></div>}

        </Container >
    )
}

export default Challenges;