import { WalletKitProvider } from "@gokiprotocol/walletkit";
import React from "react";
// import ReactDOM from 'react-dom/client';     // Module not found: Error: Can't resolve 'react-dom/client'
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

//Module not found: Error: Can't resolve 'react-dom/client'

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <WalletKitProvider
        defaultNetwork="devnet"
        app={{
          name: "My App",
        }}
      >
        <App />
      </WalletKitProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
