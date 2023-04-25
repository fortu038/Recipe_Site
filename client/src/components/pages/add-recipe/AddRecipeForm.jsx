import React, { useState } from "react";
import { useAppContext } from "../../utils/AppContext";
import { Container, Button, Form, Alert } from 'react-bootstrap';

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

          setAlertMessage(response_to_post_request);

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
    <Form onSubmit={handleSubmit}>
      { alertMessage.result === "success" &&
        <Alert key="success" variant="success">
          Successful Submit
        </Alert>
      }
      { alertMessage === "error" &&
        <Alert key="danger" variant="danger">
          Submit Error, Please Try Again Later
        </Alert>
      }
      <Form.Group controlId="name">
        <Form.Label>
          Input Recipe Name:
        </Form.Label>
        <Form.Control
          type="text"
          name="name" 
          className="form-control"
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group className="mt-3" controlId="image">
        <Form.Label>
          Provide a Recipe Image &#40;JPEGs and PNGs only, file size limit of 6Mb&#41;:
        </Form.Label>
        <Form.Control
          type="file"
          name="image"
          accept="image/png, image/jpg, image/jpeg"
          multiple={false}
          onChange={isValidFile}
          required
        />
      </Form.Group>
      <Form.Group className="mt-3" controlId="ingredients">
        <Form.Label>
          Enter Ingredients &#40;Put commas between each entry&#41;:
        </Form.Label>
        <Form.Control
          type="text"
          name="ingredients"
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group className="mt-3" controlId="tools_needed">
        <Form.Label>
          Enter Tools Neeeded to Make &#40;Put commas between each entry&#41;:
        </Form.Label>
        <Form.Control
          type="text"
          name="tools_needed"
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group className="mt-3" controlId="steps">
        <Form.Label>
          Enter Recipe Steps in Order &#40;Type each step out as the step number followed by a period and space followed by the step text&#41;:
        </Form.Label>
        <Form.Control
          as="textarea"
          name="steps"
          rows="5"
          onChange={handleInputChange}
          style={{height: "100px"}}
          placeholder={"1. Example step 1\n2. Example step 2\n3. Example step 3"}
          required
        />
      </Form.Group>
      <Container className="mt-3 d-flex justify-content-center">
        <Button id="submit-button" type="submit" variant="secondary" disabled={true}>
          Add Recipe
        </Button>
      </Container>
    </Form>
  )
};

export default AddRecipeForm;