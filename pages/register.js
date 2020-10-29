import React, { useState, useContext } from "react";
import { registerUser } from "../lib/auth";
import AppContext from "../context/AppContext";

const Register = () => {

  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const appContext = useContext(AppContext);
    return (<div>
      <div>
        <div>
          <div className="card">
            <div className="header">
              <img src="something.here" />
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
                <form>
                  <label disabled={loading}>Username:</label>
                  <input 
                  disabled={loading}
                  onChange={(e) => setData({ ...data, username: e.target.value })
                }
                value={data.username}
                type="text"
                name="username"
                />
                <label>Email:</label>
                <input onChange={(e) => setData({ ...data, email: e.target.value })
                }
                value={data.email}
                type="email"
                name="email"
                />
                <label>Password:</label>
                <input onChange={(e) => setData({ ...data, password: e.target.value })
                }
                value={data.password}
                name="password"
                type="password" 
                />
                <span>
                  <a href=""><small>Forgot Password?</small></a>
                </span>
                <button disabled={loading}
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
    </div>
    );
  };

  export default Register;