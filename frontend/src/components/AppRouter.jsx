import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import {privateRoutes, publicRoutes} from '../routes';
import { SCHEDULE_ROUTE } from '../utils/const.js';
import RequireAuth from "../hoc/RequireAuth.jsx";
import AuthRedirect from "../hoc/AuthRedirect.jsx";

/* eslint-disable react/jsx-wrap-multilines */
function AppRouter() {
  return (
    <Routes>
      {privateRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <RequireAuth>
              <Component />
            </RequireAuth>
          }
          exact
        />))}
      {publicRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <AuthRedirect>
              <Component />
            </AuthRedirect>
          }
          exact
        />))}
      <Route path="*" element={<Navigate to={SCHEDULE_ROUTE} />} />
    </Routes>
  );
}
/* eslint-enable react/jsx-wrap-multilines */

export default AppRouter;