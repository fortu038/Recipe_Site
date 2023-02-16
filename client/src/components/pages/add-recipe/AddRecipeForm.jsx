import React, { useState } from "react";

import FileBase64 from "react-file-base64";

function AddRecipeForm() {

  function isValidFile(fileBase64) {
    const starting_slice = fileBase64.slice(0,6);
    const slice_final_char = starting_slice.charAt(5);
    // Checks if base64 data is set to image
    if(slice_final_char === "i") {
      const file_data = fileBase64.split(",")[0];

      const base64_length = fileBase64.length - (file_data.length + 1);

      const file_size_in_bytes = 4 * Math.ceil((base64_length / 3)) * 0.5624896334383812;
      
      const file_size_in_Mb = (file_size_in_bytes / 1000) / 1000;

      if(file_size_in_Mb > 6.0) {
        alert("File size too large! Please use a file smaller than 7Mb");
      }
      else {
        setNewRecipeData({ ...newRecipeData, image: fileBase64 });
        document.getElementById("submit-button").hidden = false;
      }
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
      <div id="failure-alert" className="alert alert-danger" role="alert" hidden={true}>
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
        <label htmlFor="image">Provide a Recipe Image &#40;JPEGs and PNGs only, file size limit of 6Mb&#41;:</label>
        <br />
        <div className="d-flex justify-content-center">
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

      <button id="submit-button" type="submit" className="btn btn-secondary" hidden={true}>Add Recipe</button>
    </form>
  )
}

export default AddRecipeForm;