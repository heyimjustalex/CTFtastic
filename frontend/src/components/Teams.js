import { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import { getTeams } from "../lib/api";
import Container from 'react-bootstrap/Container';
import styles from './Teams.module.css';
import LoadingRingTable from "./UI/LoadingRingTable";
import { useNavigate } from "react-router-dom";

const Teams = () => {
    const [output, setOutput] = useState({});
    const { sendRequest, status, error, data } = useHttp(getTeams);
    const navigate = useNavigate();
    const handleRowClick = (id) => {
        navigate(`/teams/${id}`);
    }

    useEffect(() => {
        sendRequest()
    }, [sendRequest]);

    useEffect(() => {

        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRingTable /> });
        }

        else if (status === 'completed' && !error) {
            const dataWithSelector = data.map((element) => {
                return <tr onClick={() => handleRowClick(element.id)}>
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
        </Container>
    )
}

export default Teams;