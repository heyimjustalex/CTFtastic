import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './MainHeader.module.css';
import mainLogo from './../../assets/img/logo_darker.png';
import { useState } from 'react';

const imageElement = new Image();
imageElement.src = mainLogo;


const MainHeader = (props) => {
  return (
    <Navbar sticky="top" expand="lg" className={styles['navbar']} variant="dark" >
      <Navbar.Brand className={styles['navbar-brand']} href="#home">
        <img
          src={mainLogo}
          width="30"
          height="30"
          className="d-inline-block align-top test"
          alt="React Bootstrap logo"
        />CTFtastic</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={styles['nav'] + ' mr-auto'}>
          <Nav.Link className={styles['navlink']} href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown className={styles['navDropdown']} title="Dropdown" id={styles.dropdownMenu}>
            <NavDropdown.Item className={styles['dropdownItem']} href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item className={styles['dropdownItem']} href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item className={styles['dropdownItem']} href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider className={styles['nav-drop-divider']} />
            <NavDropdown.Item className={styles['dropdownItem']} href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>

    </Navbar>

  );
}

export default MainHeader;