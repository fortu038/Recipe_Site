import React from "react";
import { Container } from "react-bootstrap";

import Navigation from "../../Navigation";
import UserLoginForm from "./UserLoginForm";

function UserLogin() {
  return(
    <Container>
      <Navigation />

      <div className="text-secondary d-flex flex-column justify-content-center align-items-center">
        <h2>Log In</h2>
        {/* <UserLoginForm /> */}
      </div>
    </Container>
  )
}

export default UserLogin;