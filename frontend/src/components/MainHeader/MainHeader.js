import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
    if (authCTX.isLoggedIn) {
      setloginButtonContentAndUrl({ url: '/', buttonContent: 'Logout' });
    }
    else {
      setloginButtonContentAndUrl({ url: '/login', buttonContent: 'Login' });
    }
  }, [setloginButtonContentAndUrl, authCTX.isLoggedIn])

  return (
    <Navbar expanded={expanded} sticky="top" expand="lg" className={styles['navbar']} variant="dark" >
      <Navbar.Brand className={styles['navbar-brand']} onClick={() => { navigate('/') }}>
        <img
          src={mainLogo}
          width="30"
          height="30"
          className="d-inline-block align-top test"
          alt="Logo"
        />CTFtastic</Navbar.Brand>
      <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={styles['nav'] + ' ' + styles['left-menu'] + ' mr-auto '}>
          <NavLink onClick={() => setExpanded(false)} className={({ isActive }) => (isActive ? styles['active'] : styles['hover-underline-animation']) + ' ' + styles['navlink']} to="/teams">Teams</NavLink>
          <NavLink onClick={() => setExpanded(false)} className={({ isActive }) => (isActive ? styles['active'] : styles['hover-underline-animation']) + ' ' + styles['navlink']} to="/challenges">Challenges</NavLink>
          <NavLink onClick={() => setExpanded(false)} className={({ isActive }) => (isActive ? styles['active'] : styles['hover-underline-animation']) + ' ' + styles['navlink']} to="/scoreboard">Scoreboard</NavLink>
          {/* <NavDropdown className={styles['nav-dropdown']} title="Dropdown" id={styles['dropdown-menu']}>
            <NavDropdown.Item className={styles['dropdown-item']} href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item className={styles['dropdown-item']} href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item className={styles['dropdown-item']} href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider className={styles['nav-drop-divider']} />
            <NavDropdown.Item className={styles['dropdown-item']} href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Nav className={styles['nav'] + ' ' + styles['right-menu'] + ' mr-right '}>
          {!authCTX.isLoggedIn && <NavLink onClick={() => setExpanded(false)} className={({ isActive }) => (isActive ? styles['active'] : styles['hover-underline-animation']) + ' ' + styles['navlink']} to="/register">Register</NavLink>}
          <NavLink onClick={logInOutHandler}
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