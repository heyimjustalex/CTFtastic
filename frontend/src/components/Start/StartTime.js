import { Container, Button } from "react-bootstrap";
import styles from './StartTime.module.css';
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const StartTime = (props) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startDateIsOpened, setStartDateIsOpened] = useState(false);
    const [endDateIsOpened, setEndDateIsOpened] = useState(false);
    const [errorDate, setErrorDate] = useState(null);
    const [utcStartTime, setUtcStartTime] = useState(new Date().toUTCString());
    const [utcEndTime, setUtcEndTime] = useState(new Date().toUTCString());

    const datesValidator = () => {
        let startDate_TMP;
        let endDate_TMP;
        startDate['$d'] == null ? startDate_TMP = startDate : startDate_TMP = startDate['$d'];
        endDate['$d'] == null ? endDate_TMP = endDate : endDate_TMP = endDate['$d'];

        startDate_TMP.setMilliseconds(0);
        startDate_TMP.setSeconds(0);

        endDate_TMP.setMilliseconds(0);
        endDate_TMP.setSeconds(0);

        const timeStart = startDate_TMP.getTime();
        const timeEnd = endDate_TMP.getTime();

        if (timeEnd - timeStart > 0) {
            const dates = {
                startDate: startDate_TMP,
                startDateUTC: startDate_TMP.toUTCString(),
                endDate: endDate_TMP,
                endDateUTC: endDate_TMP.toUTCString(),
            }
            return dates;
        }
        else {
            return null;
        }
    }


    const startDateChangeHandler = (newValue) => {
        setStartDateIsOpened(true);
        setStartDate(newValue);
        setUtcStartTime(newValue['$d'].toUTCString())
    };

    const endDateChangeHandler = (newValue) => {
        setEndDateIsOpened(true);
        setEndDate(newValue);
        setUtcEndTime(newValue['$d'].toUTCString())
    };

    const closeStartDateHandler = () => {
        setStartDateIsOpened(false);
        const dates = datesValidator();
        dates ? setErrorDate(false) : setErrorDate(true);

    }

    const closeEndDateHandler = () => {
        setEndDateIsOpened(false);

        const dates = datesValidator();
        dates ? setErrorDate(false) : setErrorDate(true);

    }


    const submitButtonClickHandler = () => {

        const dates = datesValidator();
        if (dates) {
            setErrorDate(false);
            props.onDateTimeFilled(dates)

        }
        else {
            setErrorDate(true);
        }
    }

    return (
        <Container className={`${styles['main']} min-vh-100 d-flex`} fluid>
            <h1 className={styles['date-header']}>choose contest date&time </h1>
            <div className={`${styles['internal-container']}`}>
                <h2 className={styles['internal-header']}>start date&time</h2>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>

                        <div className={styles['date-wrapper']}>
                            <DateTimePicker className={styles['date-time']}
                                componentsProps={{
                                    actionBar: {
                                        actions: ["cancel", "accept"]
                                    }
                                }}
                                ampm={false}
                                minDate={new Date("01/01/2020")}
                                open={startDateIsOpened}
                                onOpen={() => setStartDateIsOpened(true)}
                                onClose={() => closeStartDateHandler()}
                                autoOk={true}
                                // showToolbar={true}
                                // popperProps={{
                                //     disablePortal: true,
                                // }}
                                value={startDate}
                                onChange={startDateChangeHandler}
                                renderInput={(params) => <TextField
                                    {...params}


                                    onClick={() => { setStartDateIsOpened(true) }}

                                    onKeyDown={(e) => {
                                        console.log("onkeyDown")
                                        e.preventDefault();
                                    }}


                                    sx={{

                                        svg: { color: '#FAF9F6' },
                                        input: { color: '#FAF9F6' },
                                        label: { color: "#FAF9F6" },

                                        "& *": {
                                            cursor: 'pointer'
                                        },

                                        "&.MuiInputBase-inputAdornedEnd": {
                                            width: '100%',

                                        },
                                        "& .MuiInputBase-input": {
                                            width: '100%',
                                            fontFamily: 'Space Mono',
                                            fontSize: '0.94rem',
                                            height: '1rem'
                                        },
                                        "& .MuiInputBase-root": {
                                            border: "1px solid #FAF9F6",
                                            width: '100%',
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: 'none'
                                            }
                                        }

                                    }}
                                />}
                            />
                        </div>
                    </Stack>
                </LocalizationProvider>

                <div className={styles['utc-date']}>
                    {<h2>{utcStartTime}</h2>}
                </div>

            </div>

            <div className={`${styles['internal-container']}`}>
                <h2 className={styles['internal-header']}>end date&time</h2>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <div className={styles['date-wrapper']}>
                            <DateTimePicker className={styles['date-time']}
                                componentsProps={{
                                    actionBar: {
                                        actions: ["cancel", "accept"]
                                    }
                                }}
                                ampm={false}
                                open={endDateIsOpened}
                                onOpen={() => setEndDateIsOpened(true)}
                                onClose={() => closeEndDateHandler()}
                                autoOk={true}
                                minDate={new Date("01/01/2020")}
                                disableMaskedInput
                                value={endDate}
                                onChange={endDateChangeHandler}
                                renderInput={(params) => <TextField
                                    {...params}

                                    onClick={() => { setEndDateIsOpened(true) }}

                                    onKeyDown={(e) => {
                                        console.log("onkeyDown")
                                        e.preventDefault();
                                    }}


                                    sx={{

                                        svg: { color: '#FAF9F6' },
                                        input: { color: '#FAF9F6' },
                                        label: { color: "#FAF9F6" },

                                        "& *": {
                                            cursor: 'pointer'
                                        },

                                        "&.MuiInputBase-inputAdornedEnd": {
                                            width: '100%',
                                        },
                                        "& .MuiInputBase-input": {
                                            width: '100%',
                                            fontFamily: 'Space Mono',
                                            height: '1rem',
                                            fontSize: '0.94rem'
                                        },
                                        "& .MuiInputBase-root": {
                                            border: "1px solid #FAF9F6",
                                            width: '100%',
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                border: 'none'
                                            }
                                        }

                                    }}


                                />}

                            />
                        </div>

                    </Stack>
                    <div className={styles['utc-date']}>
                        {<h2>{utcEndTime}</h2>}
                    </div>
                </LocalizationProvider>
                <div className={styles['button-div']}>
                    <Button

                        disabled={errorDate || errorDate === null}
                        onClick={submitButtonClickHandler}
                        className={`${styles['submit-button']}`}
                        variant="custom"
                        type="submit">
                        Submit!
                    </Button>
                </div>
                <div className={styles['error-wrapper']}>
                    {errorDate && <h3 className={styles['date-error-h']}>
                        start date cannot be bigger than end date</h3>}
                </div>
            </div>


        </Container>


    );
}

export default StartTime;