import React, { useState } from "react";
import { useAppContext } from "../../utils/AppContext";

function AddRecipeForm() {
  const { appState } = useAppContext();

  const [alertMessage, setAlertMessage] = useState("");

  async function convertFileToBase64(fileToConvert) {
    let result_base64 = await new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = (e) => resolve(reader.result);
        reader.readAsDataURL(fileToConvert);
    });

    return result_base64;
  };

  async function isValidFile() {
    const file = await document.getElementById("image").files[0];
    
    const file_base64 = await convertFileToBase64(file);

    const file_size = file.size;

    const file_Mb_limit = 7;
    const file_byte_limt = file_Mb_limit * 1048576;

    const is_file_too_big = file_size > file_byte_limt;

    if(is_file_too_big) {
      document.getElementById("submit-button").disabled = true;

      alert(`File size too large! Please use a file smaller than ${file_Mb_limit}Mb`);
    }
    else {
      document.getElementById("submit-button").disabled = false;

      setNewRecipeData({ ...newRecipeData, image: file_base64 });
    }
  };

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

    const username = await appState.user.username;

    await fetch("/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        {
          name: newRecipeData.name.replace(/ /g, "_"),
          image: newRecipeData.image,
          alt_text: newRecipeData.name,
          ingredients: newRecipeData.ingredients.split(", "),
          tools_needed: newRecipeData.tools_needed.split(", "),
          steps: newRecipeData.steps.split(/\d+\. /g).slice(1),
          posted_by: username,
          tags: ["EMPTY"]
        }
      )
    })
      .then(
        async function(response) {
          const response_to_post_request = await response.json();
          console.log("response_to_post_request is:");
          console.log(response_to_post_request);

          setAlertMessage(response_to_post_request.result);

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
      )
      .catch(
        function(error) {
          console.error(error);
          setAlertMessage("error");
        }
      )
  };

  return(
    <form className="mt-4 text-center" onSubmit={handleSubmit}>
      { alertMessage === "success" &&
        <div id="success-alert" className="alert alert-success" role="alert">
          Successful Submit!
        </div>
      }
      { alertMessage === "error" &&
        <div id="failure-alert" className="alert alert-danger" role="alert" hidden={true}>
          Submit Error!
        </div>
      }

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
        <label htmlFor="steps">Enter Recipe Steps in Order &#40;Type each step out as the step number followed by a period  and space followed by the step text&#41;:</label>
        <br />
        <textarea
          type="text"
          name="steps"
          className="form-control"
          rows="5"
          onChange={handleInputChange}
          style={{height: "100px"}}
          placeholder={"1. Example step 1\n2. Example step 2\n3. Example step 3"}
          required
        />
      </div>

      <button id="submit-button" type="submit" className="btn btn-secondary" disabled={true}>Add Recipe</button>
    </form>
  )
};

export default AddRecipeForm;