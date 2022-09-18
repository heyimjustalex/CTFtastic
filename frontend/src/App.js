import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import MainHeader from './components/MainHeader/MainHeader';
import Router from './components/Router'
import StartContext from './store/start-context';
import Start from './components/Start/Start';
import { useContext } from 'react';

function App() {

  const { hasStarted, setFalseStarted, setTrueStarted } = useContext(StartContext);

  return (

    <div className="App">
      {/* <Router /> */}

      <BrowserRouter>
        <MainHeader />
        <Routes>
          <Route path="/" element={hasStarted ? <p>HOME</p> : <Start />} />
          <Route path='/start' element={<Navigate to='/' />} />
          <Route path='/register' element={<p>Register</p>} />
          <Route path='/login' element={<p>Login</p>} />
          <Route path='/scoreboard' element={<p>Scoreboard</p>} />
          <Route path='/challenges' element={<p>challenges</p>} />
          <Route path='/teams' element={<p>Teams</p>} />
        </Routes>

      </BrowserRouter>


    </div >

  );
}

export default App;
