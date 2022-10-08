import forrest from "@forrestjs/core";
import reactRoot from "@forrestjs/react-root";
import reactRouter from "@forrestjs/react-router";
import reactMUI from "@forrestjs/react-mui";

// Local services:
import nhostService from "./services/nhost";

// Features:
import app from "./features/app";
import publicPages from "./features/public-pages";
import dashboard from "./features/dashboard";

forrest
  .run({
    settings: {
      app: {
        name: "Family Economy App"
      }
    },
    services: [reactRoot, reactRouter, reactMUI, nhostService],
    features: [app, publicPages, dashboard]
  })
  .catch((err) => console.error(`Boot: ${err.message}`));
