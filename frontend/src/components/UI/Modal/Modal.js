import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>{props.children}</div>
        </div>
    );
};

const portalNode = document.getElementById('overlays');
const backdropNode = document.getElementById('backdrop');

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClick} />, backdropNode)}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalNode
            )}
        </Fragment>
    );
};

export default Modal;
