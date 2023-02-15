import React, { useState } from "react";

import FileBase64 from "react-file-base64";

function AddRecipeForm() {
  // Use Buffer later for making heic and pdf files compatable with system.
  const Buffer = require("buffer/").Buffer;

  function isValidFile(fileBase64) {
    const starting_slice = fileBase64.slice(0,6);
    const slice_final_char = starting_slice.charAt(5);
    if(slice_final_char === "i") {
      setNewRecipeData({ ...newRecipeData, image: fileBase64 });
    }
    else {
      alert("Invalid file type! Please use a PNG or JPEG.");
    }
  }

  const [newRecipeData, setNewRecipeData] = useState({
    name: "",
    image: null,
    alt_text: "",
    ingredients: [],
    tools_needed: [],
    steps: [],
    posted_by: ""
  });

  function handleInputChange(e) {
    setNewRecipeData({ ...newRecipeData, [e.target.name]: e.target.value })
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("Clicked submit");
    console.log(newRecipeData);
    const posted_recipe = await fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        {
          name: newRecipeData.name.replace(/ /g, "_"),
          image: newRecipeData.image,
          alt_text: newRecipeData.name,
          ingredients: newRecipeData.ingredients.split(", "),
          tools_needed: newRecipeData.tools_needed.split(", "),
          steps: newRecipeData.steps.split(", "),
          posted_by: "posted_by placeholder",
          tags: ["EMPTY"]
        }
      )
    });
    const response_to_post_request = await posted_recipe.json();
    console.log(response_to_post_request);
    if(response_to_post_request.result === "success") {
      console.log("Created new recipe!");
      document.getElementById("success-alert").hidden = false;
      setNewRecipeData({
        name: "",
        image: null,
        alt_text: "",
        ingredients: [],
        tools_needed: [],
        steps: [],
        posted_by: ""
      });
    }
    else {
      console.log("No new recipe!");
      document.getElementById("failure-alert").hidden = false;
    }
  };

  return(
    <form className="mt-4 text-center" onSubmit={handleSubmit}>
      <div id="success-alert" className="alert alert-success" role="alert" hidden={true}>
        Successful Submit!
      </div>
      <div id="failure-alert" class="alert alert-danger" role="alert" hidden={true}>
        Submit Error!
      </div>

      <div className="form-group pb-4">
        <label htmlFor="name">Input Recipe Name:</label>
        <br />
        <input
          type="text"
          name="name" 
          className="form-control"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group pb-4">
        <label htmlFor="image">Provide a Recipe Image &#40;JPEGs and PNGs only, file size limit of 8Mb&#41;:</label>
        <br />
        <div className="d-flex justify-content-center">
          {/* <input
            type="file"
            name="image"
            className="form-control-file"
            onChange={handleInputChange}
            required
          /> */}
          <FileBase64
            className="d-flex justify-content-center"
            type="file"
            name="image"
            multiple={false}
            onDone={({ base64 }) => isValidFile(base64)}
          />
        </div>
      </div>
      <div className="form-group pb-4">
        <label htmlFor="ingredients">Enter Ingredients &#40;Put commas between each entry&#41;:</label>
        <br />
        <input
          type="text"
          name="ingredients"
          className="form-control"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group pb-4">
        <label htmlFor="tools_needed">Enter Tools Neeeded to Make &#40;Put commas between each entry&#41;:</label>
        <br />
        <input
          type="text"
          name="tools_needed"
          className="form-control"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group pb-4">
        <label htmlFor="steps">Enter Recipe Steps in Order &#40;Put commas between each entry&#41;:</label>
        <br />
        <input
          type="text"
          name="steps"
          className="form-control"
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-secondary">Add Recipe</button>
    </form>
  )
}

export default AddRecipeForm;