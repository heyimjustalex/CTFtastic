import dayjs, { Dayjs } from 'dayjs';
import { Container, Button } from "react-bootstrap";
import styles from './StartTime.module.css';
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { ClickAwayListener } from '@mui/material';

// const popperSx = {
//     "& .MuiPaper-root": {
//         border: "1px solid white",
//         color: '#FAF9F6',
//     }, "& .MuiSvgIcon-root": {
//         border: "1px solid white",
//         color: '#FAF9F6',
//     },
//     "& .MuiCalendarPicker-root": {
//         backgroundColor: "black",
//         color: '#FAF9F6',
//     },
//     "& .MuiTypography-root": {
//         backgroundColor: "black",
//         color: '#FAF9F6',
//     },
//     "& .PrivatePickersSlideTransition-root": {

//     },
//     "& .MuiPickersDay-dayWithMargin": {
//         color: 'black',
//         backgroundColor: '#FAF9F6'
//     },
//     "& .MuiPickersDay-dayWithMargin:hover": {

//         backgroundColor: 'black',
//         border: '1px solid #FAF9F6',
//         color: '#FAF9F6'
//     },
//     "& .MuiPickersDay-root:hover": {

//         backgroundColor: '#FAF9F6',
//         border: '1px solid #FAF9F6',
//         color: 'black'
//     },
//     "& .MuiPickersDay-root": {

//         backgroundColor: 'black',
//         border: '1px solid #FAF9F6',
//         color: '#FAF9F6'
//     },
//     "& .MuiPickersDay-root:focus": {

//         backgroundColor: '#FAF9F6',
//         border: '1px solid #FAF9F6',
//         color: 'black'
//     },

//     "& .MuiTabs-root": {
//         color: '#FAF9F6',
//         backgroundColor: "rgba(120, 120, 120, 0.4)"
//     },
//     "& .MuiClockPicker-root": {
//         backgroundColor: "black",
//         color: '#FAF9F6',
//     }, "& .Mui-selected": {
//         backgroundColor: 'black',
//         border: '1px solid #FAF9F6',
//         color: '#FAF9F6'
//     }, "&.MuiPickersToolbar-toolbar-2295": {
//         backgroundColor: 'black',
//         border: '1px solid #FAF9F6',
//         color: '#FAF9F6'
//     },
// };



const StartTime = (props) => {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startDateIsOpened, setStartDateIsOpened] = useState(false);
    const [endDateIsOpened, setEndDateIsOpened] = useState(false);
    const [errorDate, setErrorDate] = useState(null);
    // console.log(startDateIsOpened);


    const handleStartDateChange = (newValue) => {
        setStartDateIsOpened(true);
        setStartDate(newValue);
        // console.log("newVal", newValue);
    };

    const handleEndDateChange = (newValue) => {
        setEndDateIsOpened(true);
        setEndDate(newValue);
        //console.log(newValue);
    };

    const handleClickAway = () => {
        //console.log("handleclickaway");
        //     setStartDateIsOpened(false);
        //   setEndDateIsOpened(false);
    }

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
            console.log("startdate earlier");
            const dates = { startDate: startDate_TMP, endDate: endDate_TMP }
            return dates;
        }
        else {
            console.log("starting date must be earlier");
            return null;
        }
    }

    const nextButtonClickHandler = () => {

        const dates = datesValidator();
        if (dates) {
            console.log('validated');
            setErrorDate(false);
        }
        else {
            console.log('notvalidated');
            setErrorDate(true);
        }
        // props.onDateTimeFilled(dates)
    }

    return (

        <Container className={`${styles.main} min-vh-100 d-flex`} fluid>
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
                                onClose={() => setStartDateIsOpened(false)}
                                autoOk={true}
                                // showToolbar={true}
                                // popperProps={{
                                //     disablePortal: true,
                                // }}
                                value={startDate}
                                onChange={handleStartDateChange}
                                renderInput={(params) => <TextField
                                    {...params}


                                    onClick={() => { console.log("CLICK_2"); setStartDateIsOpened(true) }}

                                    onKeyDown={(e) => {
                                        console.log("onkeyDown")
                                        e.preventDefault();
                                    }}


                                    sx={{

                                        svg: { color: '#fff' },
                                        input: { color: '#fff' },
                                        label: { color: "#fff" },

                                        "& *": {
                                            cursor: 'pointer'
                                        },

                                        "&.MuiInputBase-inputAdornedEnd": {
                                            width: '100%',
                                        },
                                        "& .MuiInputBase-input": {
                                            width: '100%',
                                            fontFamily: 'Space Mono'
                                        },
                                        "& .MuiInputBase-root": {
                                            border: "1px solid white",
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

            </div>

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
                                open={endDateIsOpened}
                                onOpen={() => setEndDateIsOpened(true)}
                                onClose={() => setEndDateIsOpened(false)}
                                autoOk={true}
                                minDate={new Date("01/01/2020")}
                                // showToolbar={true}
                                // popperProps={{
                                //     disablePortal: true,
                                // }}
                                disableMaskedInput
                                value={endDate}
                                onChange={handleEndDateChange}
                                renderInput={(params) => <TextField
                                    {...params}


                                    onClick={() => { console.log("CLICK_2"); setEndDateIsOpened(true) }}

                                    onKeyDown={(e) => {
                                        console.log("onkeyDown")
                                        e.preventDefault();
                                    }}


                                    sx={{

                                        svg: { color: '#fff' },
                                        input: { color: '#fff' },
                                        label: { color: "#fff" },

                                        "& *": {
                                            cursor: 'pointer'
                                        },

                                        "&.MuiInputBase-inputAdornedEnd": {
                                            width: '100%',
                                        },
                                        "& .MuiInputBase-input": {
                                            width: '100%',
                                            fontFamily: 'Space Mono'
                                        },
                                        "& .MuiInputBase-root": {
                                            border: "1px solid white",
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
                <div className={styles['button-div']}>
                    <Button onClick={nextButtonClickHandler} className={`${styles.formButton}`} variant="custom" type="submit">
                        Next!
                    </Button>
                </div>
                <div className={styles['error-wrapper']}>
                    {errorDate && <h3 className={styles['date-error-h']}>
                        wrong date input</h3>}
                </div>
            </div>


        </Container>


    );
}

export default StartTime;