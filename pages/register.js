import React, { useState, useContext } from "react";
import { registerUser } from "../lib/auth";
import AppContext from "../context/AppContext";
import Hero from "../components/Hero";

const Register = () => {

  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const appContext = useContext(AppContext);
    return (
    <div>
      <Hero />
      <div className="w-full lg:w-1/3 mx-auto shadow-lg">
        <div className="bg-gray-400 flex flex-col justify-center content-center py-12 mt-20 sm:my-16 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <h2 className="mx-auto text-3xl leading-9 tracking-tight font-extrabold sm:text-4xl sm:leading-10 text-white ml-12">All the Foods.</h2><h2 className="mx-auto text-3xl leading-9 tracking-tight font-extrabold sm:text-4xl sm:leading-10 text-white -mt-6 md:mt-1 ml-6 text-red-400">All the Foods.</h2><h2 className="mx-auto text-3xl leading-9 tracking-tight font-extrabold sm:text-4xl sm:leading-10 text-white -mt-6 md:mt-1 text-red-800">All the Foods.</h2>
        </div>
            <div className="header">
              <section className="wrapper">
                {Object.entries(error).length !== 0 && error.constructor === Object && error.message.map((error) => {
                  return (
                    <div key={error.messages[0].id}>
                      <small className="text-red-600">
                        {error.messages[0].message}
                      </small>
                    </div>
                  );
                })}
                <form className="flex flex-col mx-auto mt-10">
                  <label disabled={loading}>Username:</label>
                  <input 
                  className="mb-4 p-2 rounded-md"
                  disabled={loading}
                  onChange={(e) => setData({ ...data, username: e.target.value })
                }
                value={data.username}
                type="text"
                name="username"
                />
                <label>Email:</label>
                <input 
                className="mb-4 p-2 rounded-md"
                onChange={(e) => setData({ ...data, email: e.target.value })
                }
                value={data.email}
                type="email"
                name="email"
                />
                <label>Password:</label>
                <input
                className="mb-4 p-2 rounded-md"
                onChange={(e) => setData({ ...data, password: e.target.value })
                }
                value={data.password}
                name="password"
                type="password" 
                />
                <span className="text-right text-red-800 hover:text-red-400">
                  <a href=""><small>Forgot Password?</small></a>
                </span>
                <button
                className="bg-red-800 hover:bg-red-400 text-white my-4 rounded-md py-2" 
                disabled={loading}
                onClick={() => {
                  setLoading(true);
                  registerUser(data.username, data.email, data.password)
                  .then((res) => {
                    //set authed user in global context object
                    appContext.setUser(res.data.user);
                    setLoading(false);
                  })
                  .catch((error) => {
                    setError(error.response.data);
                    setLoading(false);
                    })
                  }}
                >
                  { loading ? "Loading..." : "Submit"}
                </button>
                </form>
              </section>
            </div>
        </div>
      </div>
    </div>
    );
  };

  export default Register;