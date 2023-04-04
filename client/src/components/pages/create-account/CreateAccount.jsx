import React from "react";

import Navigation from "../../Navigation";
import CreateAccountForm from "./CreateAccountForm";

function CreateAccount() {
  return(
    <div className="bgStandard">
      <Navigation />

      <div className="text-secondary d-flex flex-column justify-content-center align-items-center">
        <h2>Create an Account</h2>
        <CreateAccountForm />
      </div>
    </div>
  )
}

export default CreateAccount;