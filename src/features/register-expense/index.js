import { RegisterExpense } from "./RegisterExpense";

const registerExpense = () => [
  {
    target: "$APP_ROUTE",
    handler: { path: "project/:id/register", element: <RegisterExpense /> }
  }
];

export default registerExpense;
