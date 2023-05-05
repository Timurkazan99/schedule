import React, {createContext, useMemo, useState} from 'react';
import useUser from "../hooks/useUser";
import {Provider} from "react-redux";
import setupStore from "../store/store";
import useDevice from "../hooks/useDevice";

export const Context = createContext(null);
const store = setupStore();

const ContextProvider = ({ children }) => {

  const logined = useUser();
  const device = useDevice();
  const [source, setSource] = useState(null);
  const eventSource = {source, setSource};
  const providerValue = useMemo(() => ({ logined, device, eventSource }), [logined, device, eventSource]);

  return (
    <Context.Provider value={providerValue}>
      <Provider store={store}>
        {children}
      </Provider>
    </Context.Provider>
  );
};

export default ContextProvider;