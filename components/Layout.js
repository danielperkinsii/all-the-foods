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
            <header>
                <div className="flex justify-between content-center px-4 bg-gray-400 text-green-700">
                    <div><Link href="/">Home</Link></div>
                    <div className="flex">
                    <div className="px-2"><Link href="/login">Sign In</Link></div>
                    <div className="px-2"><Link href="/register">Sign Up</Link></div>
                    </div>
                    
                </div>
            </header>
            <main className="mx-auto px-4">{props.children}</main>
        </div>
    )
}