import React, { useState } from 'react';

function AddRecipeForm() {
  const [newRecipeData, setNewRecipeData] = useState({
    name: "",
    image_file: null,
    ingredients: [],
    tools_needed: [],
    steps: []
  });

  function handleInputChange(e) {
    setNewRecipeData({ ...newRecipeData, [e.target.name]: e.target.value })
  };

  async function HandleSubmit(e) {
    e.preventDefault();
    console.log("Clicked submit");
    console.log(newRecipeData);
  };

  return(
    <form className="mt-4 text-center" onSubmit={HandleSubmit}>
      <div className="form-group pb-4">
        <label for="name">Input Recipe Name:</label>
        <br />
        <input
          type="text"
          name="name" 
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group pb-4">
        <label for="image_file">Provide a Recipe Image:</label>
        <br />
        <div className="d-flex justify-content-center">
          <input
            type="file"
            name="image_file"
            className="form-control-file"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group pb-4">
        <label for="ingredients">Enter Ingredients &#40;Put commas between each entry&#41;:</label>
        <br />
        <input
          type="text"
          name="ingredients"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group pb-4">
        <label for="tools_needed">Enter Tools Neeeded to Make &#40;Put commas between each entry&#41;:</label>
        <br />
        <input
          type="text"
          name="tools_needed"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group pb-4">
        <label for="steps">Enter Recipe Steps in Order &#40;Put commas between each entry&#41;:</label>
        <br />
        <input
          type="text"
          name="steps"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" class="btn btn-secondary">Add Recipe</button>
    </form>
  )
}

export default AddRecipeForm;