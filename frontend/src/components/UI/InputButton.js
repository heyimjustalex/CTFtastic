import { Button } from "@mui/material";
import { forwardRef } from "react";
import { useRef } from "react";
import styles from './InputButton.module.css';
const InputButton = (props) => {

    const fileState = useRef(null);
    const onChangeHandler = (event) => {
        props.setFile(event.target.files[0])
        // ref.current = event.target.files[0]
        // console.log(fileState);
    }

    return (
        <div>
            <Button
                className={styles['upload-button']}
                onClick={() => fileState.current.click()}
            >
                {props.label}
            </Button>

            <input
                ref={fileState}
                type="file"
                style={{ display: 'none' }}
                onChange={onChangeHandler}
            />
        </div>
    );
}

export default InputButton;