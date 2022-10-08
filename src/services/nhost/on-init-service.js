import { NhostClient } from "@nhost/react";

export const onInitService = ({ setContext }) => {
  const nhost = new NhostClient({
    subdomain: process.env.REACT_APP_NHOST_SUBDOMAIN,
    region: process.env.REACT_APP_NHOST_REGION
  });

  setContext("nhost.client", nhost);
};
