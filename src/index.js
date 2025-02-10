import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import './index.css';
import { store } from "./store";
import { Provider } from 'react-redux';
import { enableMapSet } from "immer";
import { PersistGate } from "redux-persist/integration/react";

enableMapSet();

const root = document.getElementById('root');
createRoot(root).render(
  <Provider store={store}>
    <App/>
  </Provider>
);