import { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import { getTeams } from "../lib/api";
import Container from 'react-bootstrap/Container';
import styles from './Teams.module.css';
import LoadingRingTable from "./UI/LoadingRingTable";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const Teams = () => {
    const [output, setOutput] = useState({});
    const { sendRequest, status, error, data } = useHttp(getTeams);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const teamsPerPage = 6;
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {

        const pagData = { page: currentPageNumber, size: teamsPerPage };
        sendRequest(pagData);

    }, [sendRequest, currentPageNumber])

    // const teamsVisited = pageNumber * teamsPerPage;



    const navigate = useNavigate();
    const handleRowClick = (id) => {
        navigate(`/teams/${id}`);
    }

    useEffect(() => {

    }, [sendRequest]);

    useEffect(() => {

        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRingTable /> });
        }

        else if (status === 'completed' && !error) {

            console.log("DATA", data);
            setTotalElements(data.totalElements);
            setTotalPages(data.totalPages);
            console.log(data.totalElements)

            const dataWithSelector = data.elements.map((element) => {
                return <tr key={element.id} onClick={() => handleRowClick(element.id)}>
                    <td className={styles['team-id']}>{element.id}</td>
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
        console.log("SELECTED", selected);
        setCurrentPageNumber(selected);
    }

    return (

        <Container className={`${styles['main']} d-flex flex-column`}>
            <table className={styles['table-teams']}>
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

            <div className={styles['pagination']}>
                <ReactPaginate
                    previousLabel="prev"
                    nextLabel="next"
                    pageCount={totalPages}
                    onPageChange={onChangePageHandler}
                    breakClassName={styles["page-item"]}
                    breakLinkClassName={styles["page-link"]}
                    containerClassName={styles["pagination"]}
                    pageClassName={styles["page-item"]}
                    pageLinkClassName={styles["page-link"]}
                    previousClassName={styles["page-link"]}
                    previousLinkClassName={styles["page-button"]}
                    nextClassName={styles["page-item"]}
                    nextLinkClassName={styles["page-button"]}
                    activeClassName={styles["active"]}
                >

                </ReactPaginate></div>
        </Container >
    )
}

export default Teams;