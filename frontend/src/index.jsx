import React from 'react';
import ReactDOM from 'react-dom/client';
import ContextProvider from "./components/ContextProvider.jsx";
import {BrowserRouter} from "react-router-dom";
import Init from "./init.jsx";


const app = async () => {
  // eslint-disable-next-line no-undef
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = await Init();

  root.render(
    <ContextProvider>
      <BrowserRouter>
        {vdom}
      </BrowserRouter>
    </ContextProvider>,
  );
};

app();
