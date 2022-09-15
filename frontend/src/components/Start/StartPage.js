import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import styles from './StartPage.module.css';
import Image from 'react-bootstrap/Image'
import mainLogo from './../../assets/img/logo_darker.png';
import BouncingArrow from '../UI/BouncingArrow';
import { useEffect, useState } from 'react';

const StartPage = (props) => {

    const getStartedClickedHandler = (event) => {
        event.preventDefault();
        props.onGetStarted();
    }

    return (

        <Container className={`${styles.main} min-vh-100`} fluid>
            <div className={`${styles['internal-conatiner']} mt-4`}>
                <div className={styles['logo']}>
                    <Image className={styles['image-logo']} src={mainLogo}></Image>
                </div>
                <div className={styles['logo-text']}>
                    <h1>CTF</h1>
                    <h2>tastic</h2>
                </div>
                <div className={styles['button-div']}>
                    <BouncingArrow />
                    <Button
                        onClick={getStartedClickedHandler}
                        className={`${styles['get-started-button']} mt-4`}
                        variant="custom"
                        type="submit">
                        Get started!
                    </Button>
                </div>
            </div>
        </Container>

    );
}

export default StartPage;

