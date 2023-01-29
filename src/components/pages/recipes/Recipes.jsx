import React from "react";
import { Container } from "react-bootstrap";

import Navigation from "../../Navigation";

function Recipes(props) {
  return(
    <Container>
      <Navigation />

      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2>This is the Recipes Page</h2>
      </div>
    </Container>
  )
}

export default Recipes;