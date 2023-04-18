import React from 'react';

import Navigation from "../../Navigation";
import EditRecipeForm from './EditRecipeForm';

function EditRecipe() {
  return(
    <div className="bgStandard">
      <Navigation />

      <div className="text-secondary d-flex flex-column justify-content-center align-items-center">
        <h2>Edit a Recipe</h2>
        <EditRecipeForm />
      </div>
    </div>
  )
}

export default EditRecipe;