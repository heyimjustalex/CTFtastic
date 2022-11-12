import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useInput from '../../hooks/use-input';
import { titleValidator, descriptionValidator } from '../validators'
import styles from './StartForm.module.css';
import Container from 'react-bootstrap/Container';

const Description = (props) => {

    const
        { value: titleValue,
            isTouched: titleIsTouched,
            isValid: titleIsValid,
            hasError: titleHasError,
            valueChangeHandler: titleChangeHandler,
            valueBlurHandler: titleBlurHandler,
            reset: titleReset
        } = useInput(titleValidator)

    const
        {
            value: descriptionValue,
            isTouched: descriptionIsTouched,
            isValid: descriptionIsValid,
            hasError: descriptionHasError,
            valueChangeHandler: descriptionChangeHandler,
            valueBlurHandler: descriptionBlurHandler,
            reset: descriptionReset
        } = useInput(descriptionValidator)


    const formSubmitHandler = (event) => {
        event.preventDefault();
        props.onDescriptionFilled(titleValue, descriptionValue);

    }

    const formIsValid =
        titleIsValid &&
        titleIsTouched &&
        descriptionIsValid &&
        descriptionIsTouched
    const buttonDisabledClass = formIsValid ? "" : "disabled";

    return (
        <Container className={`${styles['main']} min-vh-100 d-flex flex-column`} fluid>
            <h1 className={styles['admin-header']}>basic ctf descrption</h1>
            <Form className={`${styles['start-form']}`} onSubmit={formSubmitHandler}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className={styles['form-label']}>Title</Form.Label>
                    <Form.Control
                        className={styles['control-input']}
                        isValid={titleIsValid && titleIsTouched}
                        isInvalid={!titleIsValid && titleIsTouched}
                        onBlur={titleBlurHandler}
                        onChange={titleChangeHandler}
                        value={titleValue}
                        type="text"
                        placeholder="Enter CTF title"

                    />
                    <Form.Text className="text-muted">
                        Title will be showed at the main page, as your CTF name, max 70 chars
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="descriptionId">
                    <Form.Label className={styles['form-label']}>Description</Form.Label>
                    <Form.Control
                        className={styles['control-input']}
                        isValid={descriptionIsValid && descriptionIsTouched}
                        isInvalid={(!descriptionIsValid && descriptionIsTouched)}
                        onBlur={descriptionBlurHandler} onChange={descriptionChangeHandler}
                        as="textarea"
                        rows={5}
                        placeholder="Enter CTF description"
                        value={descriptionValue}

                    />
                    <Form.Text className="text-muted">
                        Description will be showed at the main page, max 500 chars
                    </Form.Text>
                </Form.Group>

                <div className={styles['button-div']}>
                    <Button aria-label="Next" onSubmit={formSubmitHandler} disabled={!formIsValid} className={`${styles['form-button']} ${buttonDisabledClass}`} variant="custom" type="submit">
                        Next!
                    </Button>
                </div>
            </Form>
        </Container >
    );

}

export default Description;