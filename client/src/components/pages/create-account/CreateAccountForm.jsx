import React, { useState, useEffect } from "react";

import Cookie from "js-cookie";
import { useAppContext } from "../../utils/AppContext";

const site_name = "The Online Cookbook";
const url_name = site_name.replace(/\s/g, "");

function CreateAccountForm() {
  const { appState, setAppState } = useAppContext();
  
  const [ newAccountInfo, setNewAccountInfo ] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [ formMessage, setFormMessage ] = useState({ type: "", msg: "" });

  function handleInputChange(e) {
    setNewAccountInfo({ ...newAccountInfo, [e.target.name]: e.target.value })
  };

  async function handleCreate(e) {
    e.preventDefault();
    setFormMessage({ type: "", msg: "" });

    if(newAccountInfo.password != newAccountInfo.confirmPassword) {
      setFormMessage({ type: "alert-danger", msg: "The passwords you entered did not match." })
    }
    else {
      const posted_account = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          {
            username: newAccountInfo.username,
            email: newAccountInfo.email,
            password: newAccountInfo.password
          }
        )
      });

      const response_to_post_request = await posted_account.json();

      if(response_to_post_request.result === "success") {
        const authCheck = await fetch("/api/user/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            {
              username: newAccountInfo.username,
              password: newAccountInfo.password
            }
          )
        })
        const authResult = await authCheck.json();

        if( authResult.result === "success" ){
          Cookie.set("auth-token", authResult.token);
          setAppState({...appState, user: authResult.user});
        } else {
          setFormMessage({ type: "alert-danger", msg: "Your account was created but you could not be logged in. Please try again later." });
        }
        setNewAccountInfo({ username: "", email: "", password: "", confirmPassword: "" });
      }
      else {
        setFormMessage({ type: "alert-danger", msg: response_to_post_request.message });
      }
    }
  };

  useEffect(() => {
    if( appState.user ) {
      window.location.href = `/${url_name}`;
    }
  }, [appState]);

  return(
    <>
      <form className="mt-4 text-center" onSubmit={handleCreate}>
        <div className="form-group pb-4">
          <label htmlFor="username">Username:</label>
          <br />
          <input
            type="text"
            name="username" 
            className="form-control"
            value={newAccountInfo.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group pb-4">
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="text"
            name="email" 
            className="form-control"
            value={newAccountInfo.email}
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
            value={newAccountInfo.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group pb-4">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <br />
          <input
            type="password"
            name="confirmPassword" 
            className="form-control"
            value={newAccountInfo.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

        <div className="pb-4">
          <button type="submit" className="btn btn-secondary">Create Account</button>
        </div>
      </form>
      { formMessage.msg.length > 0 && (
        <alert className={`alert ${formMessage.type}`}>
          {formMessage.msg}
        </alert>
      )}
    </>
  )
};

export default CreateAccountForm;