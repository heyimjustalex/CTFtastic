import './App.css';
import React, { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Start from './components/Start/Start';
import { useState } from 'react';
import StartContext from './store/start-context';
function App() {

  const { hasStarted, setFalseStarted, setTrueStarted } = useContext(StartContext);
  console.log(hasStarted, "APP HAS STARTED");
  return (
    <div className="App">

      <BrowserRouter>
        {!hasStarted &&
          <Routes>
            {/* <Route path='/' element={<Navigate to='/start' />}></Route> */}
            <Route path='/start' element={<Start />} />
          </Routes>}
        {hasStarted &&
          <Routes>
            <Route path='/' element={<p>Root</p>}></Route>
            <Route path='/start' element={<p>404</p>} />
          </Routes>

        }
      </BrowserRouter>
    </div>
  );
}

export default App;
