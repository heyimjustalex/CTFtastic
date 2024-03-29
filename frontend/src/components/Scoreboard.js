import { useEffect, useState } from "react";
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
    const elementsPerPage = 6;
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {

        const pagData = { page: currentPageNumber, size: elementsPerPage };
        sendRequest(pagData);

    }, [sendRequest, currentPageNumber])



    useEffect(() => {

        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRingTable /> });
        }

        else if (status === 'completed' && !error) {

            setTotalPages(data.totalPages);

            let iterator = currentPageNumber * elementsPerPage;
            const dataWithSelector = data.elements.map((element) => {
                iterator += 1
                return <tr key={element.id}>
                    <td className={styles['element-id']}>{iterator}</td>
                    <td>{element.name}</td>
                    <td> {element.points}</td>
                </tr>
            });

            setOutput({ header: 'Success!', content: dataWithSelector });

        }

        else if (status === 'completed' && error) {
            setOutput({ header: 'Error occured:', content: "No scoreboard found!" });

        }

    }, [status, error, setOutput, data]);


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
                            <th className={styles["points"]}>Points</th>
                        </tr>
                    </thead>
                }

                <tbody>
                    {status === 'completed' && !error && (data ? data.elements ? data.elements.length > 0 ? true : false : false : false) && output.content}

                    {status === 'pending' && <tr><td style={{ border: 'none' }}><h3 className={styles['loading-header']}>{output.header}</h3></td></tr>}
                    {status === 'pending' && output.content}
                    {status === 'completed' && error && <tr><td style={{ border: 'none' }}><h3 className={styles['redText']}>No scoreboard data found! Error!</h3></td></tr>}
                </tbody>
            </table>


            {/* {status === 'completed' && error && <Container className={`${styles['output-content-container']}`}><h3 className={styles['error-header']}>{output.content}</h3></Container>} */}

            {status === 'completed' && !error && (Boolean(data.elements.length))
                && (Boolean(totalPages > 1)) && < Pagination pageCount={totalPages} currentPage={currentPageNumber} onChangePage={onChangePageHandler}></Pagination>}
            {status === 'completed' &&
                !error &&
                !data.elements.length &&
                <div className={styles['output-container']}> <h3 className={styles['redText']}>Scoreboard is empty!</h3></div>}
        </Container >
    )
}

export default Scoreboard;