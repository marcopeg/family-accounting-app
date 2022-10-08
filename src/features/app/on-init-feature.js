const asReturnValue = ($) => $[0];

export const onInitFeature = ({ createExtension, setContext }) => {
  const publicRoutes = createExtension.sync("$PUBLIC_ROUTE").map(asReturnValue);
  const protectedRoutes = createExtension.sync("$APP_ROUTE").map(asReturnValue);

  setContext("app", {
    publicRoutes,
    protectedRoutes
  });
};
