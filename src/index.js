import forrestjs from "@forrestjs/core";
import reactRoot from "@forrestjs/react-root";
import reactRouter from "@forrestjs/react-router";
import reactMUI from "@forrestjs/react-mui";

// Local services:
import nhostService from "./services/nhost";

// Features:
import app from "./features/app";
import publicPages from "./features/public-pages";
import dashboard from "./features/dashboard";

// Compose your App with services and features, same way you would
// do in your backend:
forrestjs
  .run({
    settings: {
      welcome: {
        message: "Hello World"
      }
    },
    services: [reactRoot, reactRouter, reactMUI, nhostService],
    features: [app, publicPages, dashboard]
  })
  .catch((err) => console.error(`Boot: ${err.message}`));

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './styles/globals.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
