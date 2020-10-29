import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { login } from "../lib/auth";
import AppContext from "../context/AppContext";

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
        <div>
          <div>
            <div className="card">
              <div className="header">
                <img src="" />
              </div>
              <section
              className="wrapper">
              {Object.entries(error).length !== 0 && error.constructor === Object && error.message.map((error) => {
                return (
                  <div key={error.messages[0].id}>
                    <small className="text-red-600">{error.messages[0].message}</small>
                  </div>
                );
              })}
              <form>
                <div>
                <label>Email:</label>
                <input onChange={(event) => onChange(event)}
                name="identifier" />
                <label>Password:</label>
                <input onChange={(event) => onChange(event)}
                type="password"
                name="password"/>
              </div>

              <div>
                <span>
                  <a href="">
                    <small>Forgot Password?</small>
                  </a>
                </span>
                <button
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
                </div>
              </form>

              </section>
            </div>
          </div>
        </div>
      </div>
    )
  };