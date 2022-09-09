import Button from 'react-bootstrap/Button';
import StartForm from './StartForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from './../UI/Card/Card'
const Start = () => {

    return (

        <Container className='mt-4' fluid="lg"  >
            <Row>
                <Col> <Card><StartForm /></Card></Col>
            </Row>
        </Container>


    );
}

export default Start;