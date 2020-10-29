import React from "react";
import App from "next/app";
import "../styles/tailwind.css";
import Head from "next/head";
import Cookie from "js-cookie";
import fetch from "isomorphic-fetch";
import AppContext from "../context/AppContext";
import Layout from "../components/Layout";
import withData from "../lib/apollo";

class MyApp extends App {
  state = {
    user: null,
  };

  componentDidMount() {
    //grab token value from cookie
    const token = Cookie.get("token");

    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${process.env.NEXT_PUBLIC_API_URL}users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        //if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove("token");
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();
        this.setUser(user);
      });
    }
  }

  setUser = (user) => {
    this.setState({ user });
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <AppContext.Provider
        value={{
          user: this.state.user,
          usAuthenticated: !!this.state.user,
          setUser: this.setUser,
        }}
        >
          <Head>
            {/* // put title here
            // put CDN's here */}
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppContext.Provider>
    );
  }
};

export default withData(MyApp);