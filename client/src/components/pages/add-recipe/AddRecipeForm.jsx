import React, { useState } from "react";

function AddRecipeForm() {

  async function convertFileToBase64(fileToConvert) {
    console.log("file to convert:");
    console.log(fileToConvert);
    const reader = new FileReader();
    reader.readAsDataURL(fileToConvert);
    reader.onload = function () {
      console.log("reader.result is:");
      console.log(reader.result);
      return reader.result;
    };
    reader.onerror = function (err) {
      console.error(`Error: ${err}`);
    };
  }

  async function isValidFile() {
    const file = document.getElementById("image").files[0];

    console.log("file input:");
    console.log(file);

    const file_Mb_limit = 7.0;

    const file_base64 = await convertFileToBase64(file);
    console.log("file_base64 is:");
    console.log(file_base64);

    const file_data = file_base64.split(",")[0];

    const base64_length = file_base64.length - (file_data.length + 1);
    const file_size_in_bytes = 4 * Math.ceil((base64_length / 3)) * 0.5624896334383812;
    const file_size_in_Mb = (file_size_in_bytes / 1000) / 1000;

    const is_file_too_big = file_size_in_Mb > file_Mb_limit;

    if(is_file_too_big) {
      alert(`File size too large! Please use a file smaller than ${file_Mb_limit}Mb`);
    }
    else {
      setNewRecipeData({ ...newRecipeData, image: file_base64 });
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
          <input
            id="image"
            className="d-flex justify-content-center"
            type="file"
            name="image"
            accept="image/png, image/jpg, image/jpeg"
            multiple={false}
            onChange={isValidFile}
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

      <button id="submit-button" type="submit" className="btn btn-secondary">Add Recipe</button>
    </form>
  )
}

export default AddRecipeForm;