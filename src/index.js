import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CryptoProvider } from "./marketing-page/TransFunc/CryptoTrans";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CryptoProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CryptoProvider>
);
