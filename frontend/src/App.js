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
import Challenges from './components/Challenges';
import Scoreboard from './components/Scoreboard';
import Challenge from './components/Challenge';
import JoinTeam from './components/JoinTeam';
import CreateTeam from './components/CreateTeam';
import ChangeCredentials from './components/ChangeCredentials';
import User from './components/User';
import AddChallenge from './components/AddChallenge';
import StartCTF from './components/StartCTF';
import NotFound from './components/NotFound';

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


  return (
    <div className="App">
      <BrowserRouter>
        {hasStarted && <MainHeader />}
        <Routes>
          <Route path="/" element={hasStarted ? <Home /> : <Start />} />


          {hasStarted && <>
            <Route path='/login' element={<Login />} />
            <Route path='/start' element={<Navigate to='/' />} />
            <Route path='/register' element={<Register />} />
            <Route path='/scoreboard' element={<Scoreboard />} />
            <Route path='/challenges' element={<Challenges />} />
            <Route path='/join-team' element={<JoinTeam />} />
            <Route path='/teams' element={<Teams />} />
            <Route path='/create-team' element={<CreateTeam />} />
            <Route path='/change-creds' element={<ChangeCredentials />} />
            <Route path='/add-challenge' element={<AddChallenge />} />
            <Route path='/start-ctf' element={<StartCTF />} />

            <Route path='/my-team' element={<Team />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/teams/:id' element={<Team />} />
            <Route path='/challenges/:id' element={<Challenge />} />
          </>}

          <Route path="*" element={!hasStarted ? <Navigate to='/' /> : <NotFound />} />
        </Routes>

      </BrowserRouter>


    </div >

  );
}

export default App;
