import React from 'react';

import Navigation from "../../Navigation";
import AddRecipeForm from './AddRecipeForm';

function AddRecipe() {
  return(
    <div className="bgStandard">
      <Navigation />

      <div className="text-secondary d-flex flex-column justify-content-center align-items-center">
        <h2>Add a Recipe</h2>
        <AddRecipeForm />
      </div>
    </div>
  )
}

export default AddRecipe;