import styles from './LoadingRing.module.css';

const LoadingRing = () => {
    return (
        <div className={styles["lds-dual-ring"]}></div>
    );
}

export default LoadingRing;