import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import MainHeader from './components/MainHeader/MainHeader';
import StartContext from './store/start-context';
import Start from './components/Start/Start';
import { useContext, useEffect } from 'react';
import Teams from './components/Teams';
import Register from './components/Register';
import Team from './components/Team';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const { hasStarted, setFalseStartedLocalStorage, setTrueStartedLocalStorage, askBackendIfContestHasStarted } = useContext(StartContext);
  useEffect(() => {

    const setupSetupViewIfItWasNotSet = async () => {

      let backendResponseIfStarted = await askBackendIfContestHasStarted();
      if (backendResponseIfStarted) {

        setTrueStartedLocalStorage();
      }
      else {

        setFalseStartedLocalStorage();
      }

    }
    setupSetupViewIfItWasNotSet();

  }, [hasStarted, askBackendIfContestHasStarted, setTrueStartedLocalStorage, setFalseStartedLocalStorage]);

  console.log("HERE", hasStarted);

  return (
    <div className="App">
      <BrowserRouter>
        {hasStarted && <MainHeader />}
        <Routes>
          <Route path="/" element={hasStarted ? <Home /> : <Start />} />
          {/* <Route path="*" element={<Navigate to='/' />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/start' element={<Navigate to='/' />} />
          <Route path='/register' element={<Register />} />
          <Route path='/scoreboard' element={<p>Scoreboard</p>} />
          <Route path='/challenges' element={<p>challenges</p>} />
          <Route path='/teams' element={<Teams />}>

          </Route>
          <Route path='/teams/:id' element={<Team />} />
        </Routes>

      </BrowserRouter>


    </div >

  );
}

export default App;
