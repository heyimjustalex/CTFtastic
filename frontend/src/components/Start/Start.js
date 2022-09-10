import Button from 'react-bootstrap/Button';
import StartForm from './StartForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from './../UI/Card/Card'
import StartPage from './StartPage';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Start.module.css';

const Start = () => {
    const [renderedStartComponent, setRenderedStartComponent] = useState('startPage');

    const onGetStartedClickedHandler = () => {
        setRenderedStartComponent('startForm')
    }
    return (
        <>
            {renderedStartComponent === 'startPage' &&
                <StartPage onGetStarted={onGetStartedClickedHandler} />}
            {renderedStartComponent === 'startForm' &&
                <Card><StartForm /></Card>}
        </>

    );
}

export default Start;