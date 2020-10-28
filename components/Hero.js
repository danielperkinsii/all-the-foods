import React, { useState } from "react";
import Head from "next/head";
import Link from "next/Link";
import RestaurantList from "../components/RestaurantList";


export default function Hero(props){
    const title ="Welcome to Next.js";
    const [query, updateQuery] = useState("");

    return(
        <div>
            <header className="w-full mb-64 md:mb-2 -mx-4 md:w-5/6 md:mx-auto">
                <div className="bg-gray-400 h-64 flex flex-col md: flex-row">
                <img className="absolute bg-cover md:h-64" src="https://images.unsplash.com/photo-1579027989536-b7b1f875659b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />        
                <div className="flex justify-between content-center px-4 relative text-white pt-4 md:justify-end">
                    <div className="px-2"><Link href="/">Home</Link></div>
                    <div className="flex">
                    <div className="px-2"><Link href="/login">Sign In</Link></div>
                    <div className="px-2"><Link href="/register">Sign Up</Link></div>
                    </div>
                </div>
                <div className="flex flex-col justify-center content-center mt-10 relative">
                    <h2 className="mx-auto text-3xl leading-9 tracking-tight font-extrabold sm:text-4xl sm:leading-10 text-white md:mr-3">All the Foods.</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4 md:mr-3 md:text-right md:w-1/2 md:text-red-800 tracking-tight">Find your favorite area restaurants. <br /><span className="">Support small business.</span> <span className="">Eat happily.</span>
                    </p>             
                </div>
                
                </div>
            </header>
            
        </div>
    )
};