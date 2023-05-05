import React, {useContext, useEffect, useState} from "react";
import AppRouter from "./components/AppRouter.jsx";
import NavBar from "./components/NavBar.jsx";
import CommonModal from "./components/modals/CommonModal.jsx";
import {Spinner} from "react-bootstrap";
import useLogin from "./hooks/useLogin";
import {batch, useDispatch, useSelector} from "react-redux";
import fetchLocation from "./store/thunks/fetchLocation";
import fetchTemplate from "./store/thunks/fetchTemplate";
import fetchUsers from "./store/thunks/fetchUsers";
import fetchShifts from "./store/thunks/fetchShifts";
import useNotification from "./hooks/useNotification";
import useCheckMobileScreen from "./hooks/useCheckMobileScreen";
import {Context} from "./components/ContextProvider.jsx";
import {ToastContainer} from "react-toastify";
import './styles/toast.css';
import {getActivePeriod} from "./store/selectors";

function App() {
  const { device, eventSource } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const isMobile = useCheckMobileScreen();
  const login = useLogin();
  const getEventSource = useNotification();
  const period = useSelector(getActivePeriod);

  useEffect(() => {
    device.setIsMobile(isMobile);
    login()
      .then(({isAuth, apiKey}) => {
        if(isAuth) {
          batch(() => {
            dispatch(fetchLocation());
            dispatch(fetchTemplate());
            dispatch(fetchUsers());
          })
          const source = getEventSource(apiKey);
          eventSource.setSource(source);
        }
        setIsLoading(false);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return function cleanup() {
      eventSource.source.close();
    };
  }, [App]);

  useEffect(() => {
    if(period.length > 0) {
      dispatch(fetchShifts(period));
    }
  }, [period])


  if (isLoading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <span>Loading</span>
        <Spinner animation="grow" />
      </div>
    );
  }

  return (
    <div className="d-flex h-100 flex-column" >
      <NavBar />
      <div className="container wrapper">
        <AppRouter />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <CommonModal />
      </div>
    </div>
  );
}

export default App;
