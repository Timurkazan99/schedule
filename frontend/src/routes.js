import Profile from './pages/Profile.jsx';
import Auth from './pages/Auth.jsx';
import Schedule from './pages/Schedule.jsx';
import Location from './pages/Location.jsx';
import Employees from './pages/Employees.jsx';
import Attendance from './pages/Attendance.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import LoadFile from './pages/LoadFile.jsx';
import {
  PROFILE_ROUTE,
  LOGIN_ROUTE,
  SCHEDULE_ROUTE,
  LOCATION_ROUTE,
  EMPLOYEES_ROUTE,
  ATTENDANCE_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  RESET_PASSWORD_ROUTE,
  UPLOAD_ROUTE,
} from './utils/const';

const publicRoutes = [
  {
    path: FORGOT_PASSWORD_ROUTE,
    Component: ForgotPassword,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: `${RESET_PASSWORD_ROUTE}/:id/:token`,
    Component: ResetPassword,
  },
];

const privateRoutes = [
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
  {
    path: SCHEDULE_ROUTE,
    Component: Schedule,
  },
  {
    path: LOCATION_ROUTE,
    Component: Location,
  },
  {
    path: EMPLOYEES_ROUTE,
    Component: Employees,
  },
  {
    path: ATTENDANCE_ROUTE,
    Component: Attendance,
  },
  {
    path: UPLOAD_ROUTE,
    Component: LoadFile,
  },
];

export { privateRoutes, publicRoutes };
