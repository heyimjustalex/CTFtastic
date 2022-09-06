import React, { Fragment } from 'react';
import styles from './AlertBox.module.css';
import { BsXCircleFill } from "react-icons/bs";
import { CSSTransition } from 'react-transition-group';
import { createPortal } from 'react-dom';



const alertBoxNode = document.getElementById('alertBox');
const AlertBox = (props) => {

    const box = <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.show}
        timeout={400}
        classNames={{
            enter: '',
            enterActive: styles['alertBoxOpen'],
            exit: '',
            exitActive: styles['alertBoxClose'],
        }}
    >

        <div className={styles['alertBox']}>

            <div>
                <div style={{
                    boxSizing: 'border-box',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingRight: '2em',
                    paddingTop: '1em',

                }}>
                    <div onClick={props.onXButtonClick} className={styles.icon}>

                        <BsXCircleFill style={{
                            color: "black",
                            fontSize: "2.4em",
                            cursor: 'pointer',
                            alignSelf: 'center'
                        }} />
                    </div>

                </div>
                <h1>{props.title}</h1>
                <p>{props.content}</p>
                <button className="Button" onClick={props.onClose}>{props.buttonTitle}</button>

            </div>
        </div>

    </CSSTransition>


    return (
        <Fragment>
            {createPortal(box, alertBoxNode)}
        </Fragment>
    )

}
export default AlertBox;