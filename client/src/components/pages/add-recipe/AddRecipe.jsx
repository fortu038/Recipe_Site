import React from 'react';
import { Container } from 'react-bootstrap';

import Navigation from "../../Navigation";

function AddRecipe() {
  return(
    <Container>
      <Navigation />

      <div className="text-secondary d-flex flex-column justify-content-center align-items-center">
        <h2>This is the Add Recipe page</h2>
      </div>
    </Container>
  )
}

export default AddRecipe;