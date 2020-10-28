import React from "react";
import Head from "next/head";
import Link from "next/Link";

export default function Layout(props){
    const title ="Welcome to Next.js";
    return(
        <div>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <script src="https://js.stripe.com/v3" />
            </Head>
            
            <main className="mx-auto px-4">{props.children}</main>
        </div>
    )
}