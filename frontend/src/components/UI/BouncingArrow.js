import { AiOutlineArrowDown } from 'react-icons/ai';
import styles from './BouncingArrow.module.css';
const BouncingArrow = () => {

    const style = { color: "#FAF9F6", fontSize: "1.5em" }
    return (
        <div className={styles['arrow-container']}>
            <AiOutlineArrowDown style={style} className={styles['arrow-down']} />
        </div>
    )
}

export default BouncingArrow;