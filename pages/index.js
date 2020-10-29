import React, { useState } from "react";
import Head from "next/head";
import RestaurantList from "../components/RestaurantList";
import Link from "next/Link";
import Hero from "../components/Hero";

export default function Home() {
  const [query, updateQuery] = useState("");
  return (
    <div className="">
      <Head>
        <title>All the FOODS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Hero />
      </div>
      {/* //////////////// */}

      <div className="bg-gray-400 md:w-5/6 md:my-12 mx-auto text-center text-red-700 border pt-16 shadow-lg relative">
        
          <div className=""><h2 className="mx-auto text-3xl leading-9 tracking-tight font-extrabold sm:text-4xl sm:leading-10 text-white ml-12">Search All the Foods.</h2><h2 className="mx-auto text-3xl leading-9 tracking-tight font-extrabold sm:text-4xl sm:leading-10 text-white -mt-6 md:mt-1 ml-6 text-red-400">Search All the Foods.</h2><h2 className="mx-auto text-3xl leading-9 tracking-tight font-extrabold sm:text-4xl sm:leading-10 text-white -mt-6 md:mt-1 text-red-800">Search All the Foods.</h2></div><br />
          <form>
            <input placeholder="search all the foods!" 
            className="p-2 rounded-md"
            type="text"
            onChange={e => updateQuery(e.target.value.toLocaleLowerCase())}
            value={query}/>
          </form>
        
          
        <RestaurantList search={query} />
      </div>
    </div>
  )
}
