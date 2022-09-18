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
            console.log('completed');
            // console.log(data);
            const temp = data.map((element) => {
                return <Team className={styles['li-team']} key={element.id} id={element.id}
                    name={element.name}
                    points={element.points} />
            });

            // data.map((element) => console.log(element.name))
            console.log(temp);

            setOutput({ header: 'Success!', content: temp });

        }

        else if (status === 'completed' && error) {
            setOutput({ header: 'Error occured:', content: error });

        }

    }, [status, error, setOutput, data]);
    return (
        <Container className={`${styles['main']} d-flex flex-column`} fluid>

            <ul className={styles['ul-teams']}>
                {output.content}

            </ul>


        </Container>
    )
}

export default Teams;