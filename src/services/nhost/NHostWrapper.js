import { NhostReactProvider } from "@nhost/react";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { useGetContext } from "@forrestjs/react-root";

export const NHostWrapper = ({ children }) => {
  const nhost = useGetContext("nhost.client");
  return (
    <NhostReactProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>{children}</NhostApolloProvider>
    </NhostReactProvider>
  );
};
