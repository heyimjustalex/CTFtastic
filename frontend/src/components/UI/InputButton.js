import { Button } from "@mui/material";
import { forwardRef, useState } from "react";
import { useRef } from "react";
import styles from './InputButton.module.css';
const InputButton = (props) => {

    const fileState = useRef(null);
    const [filename, setFilename] = useState(null);

    const onChangeHandler = (event) => {
        const file = event.target.files[0];

        props.setFile(file);
        setFilename(file.name);
        // console.log(event.target.files[0])

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
            <p>Uploaded file: {filename}</p>
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