import styles from './LoadingRingTable.module.css';

const LoadingRingTable = () => {
    return (
        <tr className={styles["lds-dual-ring"] + ' ' + styles['output-content-container']}></tr>
    );
}

export default LoadingRingTable;