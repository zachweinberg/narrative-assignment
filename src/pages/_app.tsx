import type { AppProps } from "next/app";
import { useEffect } from "react";
import Layout from "~/components/Layout";
import { logError } from "~/lib/errors";
import useGlobalState from "~/lib/global-state";
import "../styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
  const loadCountryData = useGlobalState((state) => state.loadCountryData);

  useEffect(() => {
    loadCountryData().catch((err) => {
      logError(err);
      alert("Could not load country data.");
    });
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
