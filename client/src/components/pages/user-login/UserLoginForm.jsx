import React, { useState, useEffect } from "react";

import Cookie from "js-cookie";
import { useAppContext } from "../../utils/AppContext";

const site_name = "The Online Cookbook";
const url_name = site_name.replace(/\s/g, "");

function UserLoginForm() {
  const { appState, setAppState } = useAppContext();

  const [ loginCreds, setLoginCreds ] = useState({ username: "", password: "" });
  const [ formMessage, setFormMessage ] = useState({ type: "", msg: "" });

  async function handleLogin(e) {
    e.preventDefault();
    setFormMessage({ type: "", msg: "" });
    const authCheck = await fetch("/api/user/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginCreds)
    })
    const authResult = await authCheck.json();

    if( authResult.result === "success" ){
      Cookie.set("auth-token", authResult.token);
      setAppState({...appState, user: authResult.user});
    } else {
      setFormMessage({ type: "alert-danger", msg: "You could not be logged in with the provided username and password." });
    }
    setLoginCreds({ username: "", password: "" });
  };

  function handleInputChange(e) {
    setLoginCreds({...loginCreds, [e.target.name]: e.target.value})
  }

  useEffect(() => {
    if( appState.user ) {
      window.location.href = "/";
    }
  }, [appState]);

  return (
    <div>
      { formMessage.msg.length > 0 && (
        <alert className={`alert ${formMessage.type}`}>
          {formMessage.msg}
        </alert>
      )}
      <form className="mt-4 text-center" onSubmit={handleLogin}>
        <div className="form-group pb-4">
          <label htmlFor="username">Username:</label>
          <br />
          <input
            type="text"
            name="username" 
            className="form-control"
            value={loginCreds.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group pb-4">
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            name="password" 
            className="form-control"
            value={loginCreds.password}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="btn">Log In</button>
      </form>
      <div className="text-center">
        <a href={"/create"} className="mt-5 CreateAccountLink">Create an Account</a>
      </div>
    </div>
  )
}

export default UserLoginForm;