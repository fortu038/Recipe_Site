import React from "react";

import Navigation from "../../Navigation";
import UserLoginForm from "./UserLoginForm";

function UserLogin() {
  return(
    <div className="bgStandard">
      <Navigation />

      <div className="text-secondary d-flex flex-column justify-content-center align-items-center">
        <h2>Log In</h2>
        <UserLoginForm />
      </div>
    </div>
  )
}

export default UserLogin;