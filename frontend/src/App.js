import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import MainHeader from './components/MainHeader/MainHeader';
import Router from './components/Router'
import StartContext from './store/start-context';
import Start from './components/Start/Start';
import { useContext } from 'react';
import Teams from './components/Teams';
import Register from './components/Register';
import Team from './components/Team';

function App() {

  const { hasStarted, setFalseStarted, setTrueStarted } = useContext(StartContext);

  return (

    <div className="App">
      {/* <Router /> */}

      <BrowserRouter>
        {hasStarted && <MainHeader />}
        <Routes>
          <Route path="/" element={hasStarted ? <p>HOME</p> : <Start />} />
          <Route path="*" element={<Navigate to='/' />} />
        </Routes>
        {hasStarted &&
          <Routes>
            <Route path='/start' element={<Navigate to='/' />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<p>Login</p>} />
            <Route path='/scoreboard' element={<p>Scoreboard</p>} />
            <Route path='/challenges' element={<p>challenges</p>} />
            <Route path='/teams' element={<Teams />}>

            </Route>
            <Route path='/teams/:id' element={<Team />} />
          </Routes>}

      </BrowserRouter>


    </div >

  );
}

export default App;
