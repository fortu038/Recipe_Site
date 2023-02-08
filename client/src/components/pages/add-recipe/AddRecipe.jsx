import React from 'react';
import { Container } from 'react-bootstrap';

import Navigation from "../../Navigation";
import AddRecipeForm from './AddRecipeForm';

function AddRecipe() {
  return(
    <Container>
      <Navigation />

      <div className="text-secondary d-flex flex-column justify-content-center align-items-center">
        <h2>Add a Recipe</h2>
        <AddRecipeForm />
      </div>
    </Container>
  )
}

export default AddRecipe;