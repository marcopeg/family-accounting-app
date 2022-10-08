import { onInitFeature } from "./on-init-feature";
import { AppRoutes } from "./containers/AppRoutes";

const app = ({ registerTargets }) => {
  registerTargets({
    PUBLIC_ROUTE: "app/routes/public",
    APP_ROUTE: "app/routes/protected"
  });

  return [
    {
      target: "$INIT_FEATURE",
      handler: onInitFeature
    },
    {
      target: "$REACT_ROOT_COMPONENT",
      handler: { component: AppRoutes }
    }
  ];
};

export default app;
