import React from "react";
import App from "next/app";
import "../styles/tailwind.css";
import Head from "next/head";
import Layout from "../components/Layout";
import withData from "../lib/apollo";

function MyApp({ Component, pageProps }) {
  return (<div>
    <Head>

    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </div>)
}

export default withData(MyApp)
