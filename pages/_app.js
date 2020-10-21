import '../styles/tailwind.css'
import Head from 'next/head'
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (<div>
    <Head>

    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </div>)
}

export default MyApp
