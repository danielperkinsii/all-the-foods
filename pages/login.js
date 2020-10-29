import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { login } from "../lib/auth";
import AppContext from "../context/AppContext";
import Hero from "../components/Hero";

export default function Login(props) {
  const [data, updateData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext.isAuthenticated) {
      router.push("/"); // redirect if you're already logged in
    }
  }, []);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }
    return (
      <div>
        <Hero />
        <div className="w-full lg:w-1/3 mx-auto">
        <div className="bg-gray-400 flex flex-col justify-center content-center py-12 mt-20 sm:my-16 sm:px-6 lg:px-8">
          <div className="mx-auto"><h2 className="mx-auto text-3xl leading-9 tracking-tight font-extrabold sm:text-4xl sm:leading-10 text-white ml-12">All the Foods.</h2><h2 className="mx-auto text-3xl leading-9 tracking-tight font-extrabold sm:text-4xl sm:leading-10 text-white -mt-6 md:mt-1 ml-6 text-red-400">All the Foods.</h2><h2 className="mx-auto text-3xl leading-9 tracking-tight font-extrabold sm:text-4xl sm:leading-10 text-white -mt-6 md:mt-1 text-red-800">All the Foods.</h2></div>
            <p className="mt-2 text-center text-md text-sm leading-5 pb-8">
              Not a foodie?{" "}
              <a
                href="/register"
                className="font-medium text-red-800 hover:text-red-400 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                Click here to join!
              </a>
            </p>                        
                {Object.entries(error).length !== 0 && error.constructor === Object && error.message.map((error) => {
                  return (
                    <div key={error.messages[0].id}>
                      <small className="text-red-600">{error.messages[0].message}</small>
                    </div>
                  );
                })}
                <form className="flex flex-col w-full mx-auto">
                  <label>Email:</label>
                  <input className="mb-4 p-2 rounded-md" onChange={(event) => onChange(event)}
                  name="identifier" />
                  <label>Password:</label>
                  <input className="mb-4 p-2 rounded-md"
                  onChange={(event) => onChange(event)}
                  type="password"
                  name="password"/>                         
                  <span className="text-right text-red-800 hover:text-red-400">
                    <a href="">
                      <small>Forgot Password?</small>
                    </a>
                  </span>
                  <button
                  className="bg-red-800 hover:bg-red-400 text-white my-4 rounded-md py-2"
                  onClick={() => {
                    setLoading(true);
                    login(data.identifier, data.password)
                    .then((res) => {
                      setLoading(false);
                      // set authed user in global context to update header/app state
                      appContext.setUser(res.data.user);
                    })
                    .catch((error) => {
                      setError(error.response.data);
                      setLoading(false);
                    });
                  }}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>               
                </form>
          </div>
        </div>
      </div>
    )
  };