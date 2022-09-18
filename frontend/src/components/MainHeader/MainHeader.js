import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './MainHeader.module.css';
import mainLogo from './../../assets/img/logo_darker.png';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';


const imageElement = new Image();
imageElement.src = mainLogo;


const MainHeader = (props) => {
  const navigate = useNavigate()
  return (
    <Navbar sticky="top" expand="lg" className={styles['navbar']} variant="dark" >
      <Navbar.Brand className={styles['navbar-brand']} onClick={() => { navigate('/') }}>
        <img
          src={mainLogo}
          width="30"
          height="30"
          className="d-inline-block align-top test"
          alt="Logo"
        />CTFtastic</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={styles['nav'] + ' ' + styles['left-menu'] + ' mr-auto'}>
          <NavLink className={({ isActive }) => (isActive ? styles['active'] : styles['hover-underline-animation']) + ' ' + styles['navlink']} to="/teams">Teams</NavLink>
          <NavLink className={({ isActive }) => (isActive ? styles['active'] : styles['hover-underline-animation']) + ' ' + styles['navlink']} to="/challenges">Challenges</NavLink>
          <NavLink className={({ isActive }) => (isActive ? styles['active'] : styles['hover-underline-animation']) + ' ' + styles['navlink']} to="/scoreboard">Scoreboard</NavLink>
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
        <Nav className={styles['nav'] + ' ' + styles['right-menu'] + ' mr-right'}>
          <NavLink className={({ isActive }) => (isActive ? styles['active'] : styles['hover-underline-animation']) + ' ' + styles['navlink']} to="/register">Register</NavLink>
          <NavLink className={({ isActive }) => (isActive ? styles['active'] : styles['hover-underline-animation']) + ' ' + styles['navlink']} to="/login">Login</NavLink>


        </Nav>
      </Navbar.Collapse>

    </Navbar>

  );
}

export default MainHeader;