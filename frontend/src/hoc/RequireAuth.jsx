import React, {useContext} from "react";
import {useLocation, Navigate} from 'react-router-dom';
import {Context} from "../components/ContextProvider.jsx";
import {LOGIN_ROUTE} from "../utils/const";

const RequireAuth = ({children}) => {
  const location = useLocation();
  const {logined: {isAuth}} = useContext(Context);

  if(!isAuth) {
    return <Navigate to={LOGIN_ROUTE} state={{from: location}} />
  }

  return children;
};

export default RequireAuth;