import React from 'react';
import styles from './Backdrop.module.css';
import { CSSTransition } from 'react-transition-group';
import { Fragment } from 'react';
import { createPortal } from 'react-dom';


const backdropNode = document.getElementById('backdrop');
const Backdrop = (props) => {

    const box = <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.show}
        timeout={300}
        classNames={{
            enter: '',
            enterActive: styles['BackdropOpen'],
            exit: '',
            exitActive: styles['BackdropClose'],
        }}
    >
        <div onClick={props.onClick} className={styles.Backdrop}>

        </div>
    </CSSTransition>

    return (
        <Fragment>
            {createPortal(box, backdropNode)}
        </Fragment>
    )




};

export default Backdrop;