import { Dashboard } from "./Dashboard";

const dashboard = () => [
  {
    target: "$APP_ROUTE",
    handler: { index: true, element: <Dashboard /> }
  }
];

export default dashboard;
