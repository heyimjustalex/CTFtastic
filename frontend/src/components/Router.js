import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import StartContext from '../store/start-context';
import Start from './../components/Start/Start';

const Router = (props) => {

    const { hasStarted, setFalseStarted, setTrueStarted } = useContext(StartContext);
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={hasStarted ? <p>HOME</p> : <Start />} />
                <Route path='/start' element={<Navigate to='/' />} />

            </Routes>

        </BrowserRouter>
    )
}

export default Router;