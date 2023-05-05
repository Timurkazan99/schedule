import React, {useContext} from 'react';
import {Navigate} from "react-router-dom";
import {Context} from "../components/ContextProvider.jsx";
import {SCHEDULE_ROUTE} from "../utils/const";

const AuthRedirect = ({children}) => {
  const {logined: {isAuth}} = useContext(Context);

  if(isAuth) {
    return <Navigate to={SCHEDULE_ROUTE} />
  }

  return children;
};

export default AuthRedirect;