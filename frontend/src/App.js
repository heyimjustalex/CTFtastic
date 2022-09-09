import './App.css';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Start from './components/Start/Start';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/start' />}></Route>
          <Route path='/start' element={<Start />} />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
