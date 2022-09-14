import React from "react";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StartContextProvider } from "./store/start-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StartContextProvider>
    <App />
  </StartContextProvider>
);

reportWebVitals();