import { LoginPage } from "./LoginPage";
import { SignupPage } from "./SignupPage";

const publicPages = () => [
  {
    target: "$PUBLIC_ROUTE",
    handler: {
      path: "login",
      element: <LoginPage />
    }
  },
  {
    target: "$PUBLIC_ROUTE",
    handler: {
      path: "signup",
      element: <SignupPage />
    }
  }
];

export default publicPages;
