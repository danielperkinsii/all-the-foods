import Head from 'next/head'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>All the FOODS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-gray-200 text-center text-green-500 border shadow-lg rounded-lg">
        <h1>Welcome to All the FOODS!</h1>
      </div>
      
    </div>
  )
}
