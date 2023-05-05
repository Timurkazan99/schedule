import React, {useContext} from 'react';
import {Nav, NavDropdown} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {
  ATTENDANCE_ROUTE,
  EMPLOYEES_ROUTE,
  LOCATION_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  SCHEDULE_ROUTE,
  UPLOAD_ROUTE
} from "../utils/const";
import NotificationMenu from "./NotificationMenu.jsx";
import {Context} from "./ContextProvider.jsx";
import MobileFilter from "./MobileFilter.jsx";
import {useTranslation} from "react-i18next";

const NavBarFit = () => {
  const {logined, device, eventSource} = useContext(Context);
  const navigate = useNavigate();
  const locate = useLocation();
  const { t } = useTranslation('translation', { keyPrefix: 'navBar'})

  return (
    <>
      <Nav className="me-auto">
        <Nav.Link
          as={() => (<NavLink className="nav-link" to={SCHEDULE_ROUTE}>{t('schedule')}</NavLink>)}
        >
        </Nav.Link>
      </Nav>
      {
        (locate.pathname === SCHEDULE_ROUTE) && device.isMobile &&
          <MobileFilter />
      }
      <NotificationMenu />
      <Nav>
        <NavDropdown
          title={t('menu')}
          id="collapsible-nav-dropdown"
          align="end"
        >
          <NavDropdown.Item
            as={() => (<NavLink className="dropdown-item" to={PROFILE_ROUTE}>{t('profile')}</NavLink>)}
          />
          <NavDropdown.Item
            as={() => (<NavLink className="dropdown-item" to={EMPLOYEES_ROUTE}>{t('employees')}</NavLink>)}
          />
          <NavDropdown.Item
            as={() => (<NavLink className="dropdown-item" to={LOCATION_ROUTE}>{t('locations')}</NavLink>)}
          />
          {
            logined.isAdmin &&
              <NavDropdown.Item
                as={() => (<NavLink className="dropdown-item" to={ATTENDANCE_ROUTE}>{t('attendance')}</NavLink>)}
              />
          }
          {
            logined.isAdmin &&
            <NavDropdown.Item
              as={() => (<NavLink className="dropdown-item" to={UPLOAD_ROUTE}>{t('upload')}</NavLink>)}
            />
          }
          <NavDropdown.Divider />
          <NavDropdown.Item
            href=""
            onClick={() => {
              localStorage.clear();
              logined.setUser({});
              logined.setIsAuth(false);
              navigate(LOGIN_ROUTE)
              eventSource.source.close();
            }}
          >
            {t('logout')}
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </>
  );
};

export default NavBarFit;