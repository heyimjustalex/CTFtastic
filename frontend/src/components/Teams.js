import { useEffect, useState } from "react";
import useHttp from "../hooks/use-http";
import { getTeams } from "../lib/api";
import LoadingRing from './UI/LoadingRing';
import Container from 'react-bootstrap/Container';
import Team from "./Team";
import styles from './Teams.module.css';


const Teams = () => {
    console.log('reaload')
    const [output, setOutput] = useState({});
    const { sendRequest, status, error, data } = useHttp(getTeams);

    useEffect(() => {
        sendRequest()
    }, [sendRequest]);

    useEffect(() => {
        // sendRequest();
        //handle different status states

        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (status === 'completed' && !error) {
            const dataWithTeamSelector = data.map((element) => {
                return <Team key={element.id}
                    id={element.id}
                    name={element.name}
                    points={element.points} />
            });

            setOutput({ header: 'Success!', content: dataWithTeamSelector });
            console.log(dataWithTeamSelector);
        }

        else if (status === 'completed' && error) {
            setOutput({ header: 'Error occured:', content: error });

        }

    }, [status, error, setOutput, data]);
    return (
        <Container className={`${styles['main']} d-flex flex-column`}>
            <table className={styles['table-teams']}>
                {status === 'completed' && !error &&
                    <tr className={styles['table-header']}>
                        <th></th>
                        <th>Name</th>
                        <th className={styles["points"]}>Points</th>
                    </tr>}

                {status === 'completed' && !error && output.content}
            </table>
            {status === 'pending' && <Container className={`${styles['output-content-container']}`} ><h3 className={styles['loading-header']}>{output.header}</h3></Container>}
            {status === 'pending' && <Container className={`${styles['output-content-container']}`} >{output.content}</Container>}
            {status === 'completed' && error && <Container className={`${styles['output-content-container']}`}><h3 className={styles['error-header']}>{output.content}</h3></Container>}

        </Container>
    )
}

export default Teams;