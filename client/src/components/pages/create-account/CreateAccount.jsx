import React from "react";
import { Container } from "react-bootstrap";

import Navigation from "../../Navigation";
import CreateAccountForm from "./CreateAccountForm";

function CreateAccount() {
  return(
    <Container>
      <Navigation />

      <div className="text-secondary d-flex flex-column justify-content-center align-items-center">
        <h2>Create an Account</h2>
        <CreateAccountForm />
      </div>
    </Container>
  )
}

export default CreateAccount;