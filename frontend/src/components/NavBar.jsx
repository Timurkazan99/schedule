import React, {useContext} from 'react';
import {Navbar} from 'react-bootstrap';
import NavBarFit from "./NavBarFit.jsx";
import {Context} from "./ContextProvider.jsx";

const NavBar = () => {
  const {logined: {isAuth}, device: {isMobile}} = useContext(Context);
  return (
    <Navbar bg="light" variant="light" className="border shadow mb-3 px-2 justify-content-between">
      <Navbar.Brand>
        <img
          src="/assets/img/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />{' '}
        {
          'Schedule' && !isMobile
        }
      </Navbar.Brand>
      {
        isAuth &&
          <NavBarFit/>
      }
    </Navbar>
  );
};

export default NavBar;