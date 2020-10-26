import React, { useState } from "react";
import Head from "next/head";
import RestaurantList from "../components/RestaurantList";

export default function Home() {
  const [query, updateQuery] = useState("");
  return (
    <div className="">
      <Head>
        <title>All the FOODS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gray-200 text-center text-green-500 border shadow-lg rounded-lg">
        <h1>Welcome to All the FOODS!</h1>
        <form>
          <label>Search</label>
          <input 
          onChange={e => updateQuery(e.target.value.toLocaleLowerCase())}
          value={query}/>
        </form>
        <RestaurantList search={query} />
      </div>
      
    </div>
  )
}
