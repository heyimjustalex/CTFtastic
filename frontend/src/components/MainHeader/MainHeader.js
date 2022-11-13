import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import styles from './MainHeader.module.css';
import mainLogo from './../../assets/img/logo_darker.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '../../store/auth-context';


const imageElement = new Image();
imageElement.src = mainLogo;

const MainHeader = (props) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const authCTX = useContext(AuthContext);
  const [loginButtonContentAndUrl, setloginButtonContentAndUrl] = useState({ url: '/login', buttonContent: 'Login' });


  const logInOutHandler = () => {
    setExpanded(false);
    if (authCTX.isLoggedIn) {
      authCTX.logout();
    }
  }



  useEffect(() => {
    console.log("IS LOGGED USE EFFECT", authCTX.isLoggedIn);
    if (authCTX.isLoggedIn) {

      setloginButtonContentAndUrl({ url: '/', buttonContent: 'Logout' });
    }
    else {

      setloginButtonContentAndUrl({ url: '/login', buttonContent: 'Login' });
    }
  }, [setloginButtonContentAndUrl, authCTX.isLoggedIn])

  // const [localRole, setlLocalRole] = useState(authCTX.role);

  // useEffect(() => {
  //   console.log("ROLED USE EFFECT", authCTX.role);
  //   if (authCTX.role === "ROLE_CTF_ADMIN") {
  //     setlLocalRole("ROLE_CTF_ADMIN");

  //   }
  //   else if (authCTX.role === "ROLE_TEAM_CAPITAN") {
  //     setlLocalRole("ROLE_TEAM_CAPITAN");

  //   }
  //   else if (authCTX.role === "ROLE_USER_WITH_TEAM") {
  //     setlLocalRole("ROLE_USER_WITH_TEAM");

  //   }
  //   else {
  //     setlLocalRole("ROLE_USER")

  //   }
  // }, [authCTX.role, authCTX.isLoggedIn])

  return (
    <Navbar
      expanded={expanded}
      sticky="top"
      expand="lg"
      className={styles['navbar']}
      variant="dark" >
      <Navbar.Brand
        className={styles['navbar-brand']}
        onClick={() => { navigate('/') }}>
        <img
          src={mainLogo}
          width="30"
          height="30"
          className="d-inline-block align-top test"
          alt="Logo"
        />CTFtastic
      </Navbar.Brand>
      <Navbar.Toggle
        onClick={() => setExpanded(expanded ? false : "expanded")}
        aria-controls="basic-navbar-nav"
      />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={styles['nav'] + ' ' + styles['left-menu'] + ' mr-auto '}>
          <NavLink
            onClick={() => setExpanded(false)}
            className={({ isActive }) => (isActive ? styles['active'] : styles['hover-underline-animation']) + ' ' + styles['navlink']} to="/teams">
            Teams</NavLink>

          <NavLink
            onClick={() => setExpanded(false)}
            className={({ isActive }) => (isActive ? styles['active'] : styles['hover-underline-animation']) + ' ' + styles['navlink']} to="/challenges">
            Challenges</NavLink>
          <NavLink
            onClick={() => setExpanded(false)}
            className={({ isActive }) => (isActive ? styles['active'] : styles['hover-underline-animation']) + ' ' + styles['navlink']} to="/scoreboard">
            Scoreboard
          </NavLink>

          {authCTX.isLoggedIn
            && <NavDropdown
              className={styles['nav-dropdown']}
              id={styles['nav-dropdown']}
              title="User options">

              {authCTX.role === 'ROLE_USER' &&
                <>

                  <NavDropdown.Item
                    as={NavLink} to={'/join-team'}
                    className={styles['dropdown-item'] + ' ' + styles['hover-underline-animation']}>
                    Join Team
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    as={NavLink}
                    to={'/create-team'}
                    className={styles['dropdown-item'] + ' ' + styles['hover-underline-animation']}>
                    Create Team
                  </NavDropdown.Item>
                </>}

              {(authCTX.role === 'ROLE_TEAM_CAPITAN' || authCTX.role === 'ROLE_USER_WITH_TEAM') &&
                <>
                  <NavDropdown.Item
                    as={NavLink}
                    to={'/teams/' + authCTX.idTeam}
                    className={styles['dropdown-item'] + ' ' + styles['hover-underline-animation']}>
                    {authCTX.role === 'ROLE_TEAM_CAPITAN' ? 'Manage Team' : 'My Team'}
                  </NavDropdown.Item>
                </>}

              <NavDropdown.Item
                as={NavLink}
                to={'/change-creds'}
                className={styles['dropdown-item'] + ' ' + styles['hover-underline-animation']}>
                Change Credentials
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
            </NavDropdown>}

          {authCTX.isLoggedIn && authCTX.role === 'ROLE_CTF_ADMIN'
            && <>
              <NavDropdown
                className={styles['nav-dropdown']}
                id={styles['nav-dropdown-admin-panel']}
                title="Admin Panel">

                <NavDropdown.Item
                  as={NavLink} to={'/add-challenge'}
                  className={styles['dropdown-item'] + ' ' + styles['underline-animation-admin-panel']}>
                  Add challenge
                </NavDropdown.Item>

                <NavDropdown.Item
                  as={NavLink} to={'/start-ctf'}
                  className={styles['dropdown-item'] + ' ' + styles['underline-animation-admin-panel']}>
                  Start CTF
                </NavDropdown.Item>


              </NavDropdown></>}



        </Nav>

        <Nav className={styles['nav'] + ' ' + styles['right-menu'] + ' mr-right '}>
          {!authCTX.isLoggedIn &&
            <NavLink onClick={() => setExpanded(false)}
              className={({ isActive }) => (isActive ? styles['active'] : styles['hover-underline-animation']) + ' ' + styles['navlink']} to="/register">
              Register
            </NavLink>}
          <NavLink
            onClick={logInOutHandler}
            className={({ isActive }) => (
              !authCTX.isLoggedIn ?
                (isActive ?
                  styles['active'] : styles['hover-underline-animation'])
                : styles['redText'] + ' ' + styles['hover-underline-animation']
            ) + ' ' + styles['navlink']} to={loginButtonContentAndUrl.url}>{loginButtonContentAndUrl.buttonContent}</NavLink>
        </Nav>
      </Navbar.Collapse>

    </Navbar>

  );
}

export default MainHeader;