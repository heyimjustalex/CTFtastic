
import styles from './Home.module.css';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import { getContests } from '../lib/api';
import LoadingRing from './UI/LoadingRing';

const Home = (props) => {

    const { sendRequest, data, status, error } = useHttp(getContests);
    const [output, setOutput] = useState();

    useEffect(() => {
        sendRequest();
    }, [window.location, sendRequest]);

    useEffect(() => {

        if (status === 'pending') {
            setOutput({ header: 'Loading...', content: <LoadingRing /> });
        }

        else if (status === 'completed' && !error) {

            try {
                let startTimeUTC = new Date(data.elements[0].startTimeUtc);
                let endTimeUTC = new Date(data.elements[0].endTimeUtc);
                const title = data.elements[0].title || 'CTF title';
                const description = data.elements[0].description || 'CTF description';
                startTimeUTC = startTimeUTC.toLocaleString();
                endTimeUTC = endTimeUTC.toLocaleString();

                setOutput({ header: title, content: { description: description, startTime: String(startTimeUTC), endTime: String(endTimeUTC) } });

            }
            catch {
                localStorage.removeItem('hasStarted');
                setOutput({ header: 'No contests found!', content: { description: 'Try reloading page and create contest!' } })

            }
        }

        else if (status === 'completed' && error) {
            setOutput({ header: 'Error occured:', content: { description: error } });

        }

    }, [status, error, setOutput, data]);

    let textColor = "";
    if (status === 'completed' && !error) {
        textColor = 'blueText';

    }
    if (status === 'completed' && error) {
        textColor = 'redText';
    }

    return (

        <Container className={`${styles['main']} d-flex flex-column`} fluid>
            <div className={styles['output-container']}>
                {!(status === 'pending') && <h1 className={styles[textColor]}>{output ? output.header : ''}</h1>}
                {!(status === 'pending') && <p> {output ? output.content.description : ''}</p>}
                {!(status === 'pending') && <h2 className={styles[textColor]}>{output ? output.header !== 'No contests found!' ? '' : 'Start Time:' : ''}</h2>}
                {!(status === 'pending') && <p>{output ? output.content.startTime : ''}</p>}
                {!(status === 'pending') && <h2 className={styles[textColor]}>{output ? output.header !== 'No contests found!' ? '' : 'End Time:' : ''}</h2>}
                {!(status === 'pending') && <p>{output ? output.content.endTime : ''}</p>}
                {status === 'pending' &&
                    <LoadingRing />}
            </div>
        </Container >
    );

}

export default Home;