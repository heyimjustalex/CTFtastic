import { useCallback, useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import { getTeams } from "../lib/api";
import Container from 'react-bootstrap/Container';
import styles from './Scoreboard.module.css';
import LoadingRingTable from "./UI/LoadingRingTable";
import Pagination from "./Pagination";

const Scoreboard = () => {
    const [output, setOutput] = useState({});
    const { sendRequest, status, error, data } = useHttp(getTeams);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const teamsPerPage = 6;
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {

        const pagData = { page: currentPageNumber, size: teamsPerPage };
        sendRequest(pagData);

    }, [sendRequest, currentPageNumber])



    useEffect(() => {

        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRingTable /> });
        }

        else if (status === 'completed' && !error) {
            // setTotalElements(data.totalElements);
            setTotalPages(data.totalPages);

            const dataWithSelector = data.elements.map((element) => {
                return <tr key={element.id}>
                    <td className={styles['element-id']}>{element.id}</td>
                    <td>{element.name}</td>
                    <td> {element.points}</td>
                </tr>
            });

            setOutput({ header: 'Success!', content: dataWithSelector });

        }

        else if (status === 'completed' && error) {
            setOutput({ header: 'Error occured:', content: error });

        }

    }, [status, error, setOutput, data]);


    const onChangePageHandler = ({ selected }) => {
        setCurrentPageNumber(selected);
    }

    return (

        <Container className={`${styles['main']} d-flex flex-column`}>
            <table className={styles['table-elements']}>
                {status === 'completed' && !error &&
                    <thead>
                        <tr className={styles['table-header']}>
                            <th>ID</th>
                            <th>Name</th>
                            <th className={styles["points"]}>Points</th>
                        </tr>
                    </thead>
                }
                <tbody>
                    {status === 'completed' && !error && output.content}
                    {status === 'pending' && <tr><td style={{ border: 'none' }}><h3 className={styles['loading-header']}>{output.header}</h3></td></tr>}
                    {status === 'pending' && output.content}
                </tbody>
            </table>
            {status === 'completed' && error && <Container className={`${styles['output-content-container']}`}><h3 className={styles['error-header']}>{output.content}</h3></Container>}

            <Pagination pageCount={totalPages} onChangePage={onChangePageHandler}></Pagination>

        </Container >
    )
}

export default Scoreboard;