import Layout from "@components/Layout";
import { AppProps } from "next/app";
import React from "react";
import "@views/Home/styles.css";

const App = ({ Component, pageProps }: AppProps) => (
  <Layout title="Tax Breakdown">
    <Component {...pageProps} />
  </Layout>
);

export default App;
