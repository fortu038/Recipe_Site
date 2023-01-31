import React from "react";
import { Container } from "react-bootstrap";

import Navigation from "../../Navigation";
import RecipesGrid from "./RecipesGrid";

function Recipes(props) {
  return(
    <Container>
      <Navigation />

      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2>This is the Recipes Page</h2>
        <RecipesGrid />
      </div>
    </Container>
  )
}

export default Recipes;