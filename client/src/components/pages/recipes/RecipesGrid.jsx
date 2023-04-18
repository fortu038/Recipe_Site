import React, { useState } from 'react';
import bcryptjs from "bcryptjs";
import { Container, Card, Button, Modal, Form, Alert } from 'react-bootstrap';

function RecipesGrid (props) {
  let recipe_data = props.single_recipe;

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");

  const [editedRecipe, setEditedRecipe] = useState({});

  const clean_name = recipe_data.name.replace(/_/g, " ");

  function hideInfoSection() {
    document.getElementById(`info-section-${hashed_id}`).hidden = true;
    document.getElementById(`hide-button-${hashed_id}`).hidden = true;
    document.getElementById(`show-button-${hashed_id}`).hidden = false;
  };
  
  function showInfoSection() {
    document.getElementById(`info-section-${hashed_id}`).hidden = false;
    document.getElementById(`hide-button-${hashed_id}`).hidden = false;
    document.getElementById(`show-button-${hashed_id}`).hidden = true;
  };

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
      alert(`File size too large! Please use a file smaller than ${file_Mb_limit}Mb`);
    }
    else {
      setEditedRecipe({ ...editedRecipe, image: file_base64 });
    }
  };

  /**
   * Helper function that creates a list of a desired type using given data
   * @param {*} list_type The type of list to be created. Valid inputs are ul, ol_type_1, ol_type_a, ol_type_A, ol_type_i, and ol_type_I.
   * Any other entries will result in a console error being thrown.
   * @param {*} list_data The data the list is to be constructed from. If invalid data is entered a console error will be thrown.
   * @returns The HTML representing the desired list, or a console error if an invalid list type or invalid list data is entered.
   */
  function createDynamicLengthHTMLList(list_type, list_data) {
    if(!list_data) {
      console.error("Invalid or no list data");
      return;
    };

    const list_items = list_data.map((item, index) => {
        return <li key={index}>{item}</li>
      }
    );

    switch(list_type) {
      case "ul":
        return <ul>{list_items}</ul>
      case "ol_type_1":
        return <ol type="1">{list_items}</ol>
      case "ol_type_a":
        return <ol type="a">{list_items}</ol>
      case "ol_type_A":
        return <ol type="A">{list_items}</ol>
      case "ol_type_i":
        return <ol type="i">{list_items}</ol>
      case "ol_type_I":
        return <ol type="I">{list_items}</ol>
      default:
        console.error(`Invalid list type ${list_type}: Use only ul, ol_type_1, ol_type_a, ol_type_A, ol_type_i, or ol_type_I`);
        return;
    };
  };

  function handleInputChange(e) {
    setEditedRecipe({ ...editedRecipe, [e.target.name]: e.target.value });
  };

  function handleRecipeEdit(e) {
    e.preventDefault();

    console.log("edited");
    
    if(editedRecipe.name != null && editedRecipe.name != undefined) {
      console.log("name");
      const curr_name = editedRecipe.name;
      setEditedRecipe({ ...editedRecipe, alt_text: curr_name });
      setEditedRecipe({ ...editedRecipe, name: curr_name.replace(/ /g, "_") });
      console.log("name end");
    }
    if(editedRecipe.ingredients != null && editedRecipe.ingredients != undefined) {
      console.log("ingredients");
      setEditedRecipe({ ...editedRecipe, ingredients: editedRecipe.ingredients.split(", ") });
      console.log("ingredients end");
    }
    if(editedRecipe.tools_needed != null && editedRecipe.tools_needed != undefined) {
      console.log("tools_needed");
      setEditedRecipe({ ...editedRecipe, tools_needed: editedRecipe.tools_needed.split(", ") });
      console.log("tools_needed end");
    }
    if(editedRecipe.steps != null && editedRecipe.steps != undefined) {
      console.log("steps");
      setEditedRecipe({ ...editedRecipe, steps: editedRecipe.steps.split(/\d+\. /g).slice(1) });
      console.log("steps end");
    }

    console.log("past ifs")
    console.log(editedRecipe);
    setEditModalShow(false);
  };


  function handleEditModalOpen() {
    setEditModalShow(true);
  };

  function handleEditModalClose() {
    setEditModalShow(false);
  };

  async function handleRecipeDelete() {
    console.log("deleted");
    await fetch(`/api/recipe/${recipe_data._id}`, {
      method: "DELETE",
    })
      .then(function(fetch_response) 
        {
          console.log(fetch_response.result);
        }
      )
      .catch(function(err) 
      {
        console.log(err);
      })

    setDeleteModalShow(false);

    window.location.reload();
    return false;
  };

  function handleDeleteModalOpen() {
    setDeleteModalShow(true);
  };

  function handleDeleteModalClose() {
    setDeleteModalShow(false);
  };

  const salt = bcryptjs.genSaltSync(10);
  var hashed_id = bcryptjs.hashSync(recipe_data._id, salt);

  // TODO: Make mobile screen container size w-50 and computer screen container size w-75
  return(
    <Container className="my-4 w-50 bgStandard">
      <Card>
        <Card.Img variant="top" src={recipe_data.image} alt={recipe_data.alt_text}  />
        <Card.Header>
          <h5>
            {clean_name}
          </h5>
        </Card.Header>
        <Button
          id={`show-button-${hashed_id}`}
          variant="secondary"
          onClick={showInfoSection}
          hidden={false}
        >
          Show Info
        </Button>
        <Button
          id={`hide-button-${hashed_id}`}
          variant="secondary"
          onClick={hideInfoSection}
          hidden={true}
        > 
          Hide Info
        </Button>
        <Card.Text id={`info-section-${hashed_id}`} hidden={true}>
          <h6>
            Ingredients:
            {createDynamicLengthHTMLList("ul", recipe_data.ingredients)}
          </h6>
          <h6>
            Tools Needed to Make:
            {createDynamicLengthHTMLList("ul", recipe_data.tools_needed)}
          </h6>
          <h6>
            Recipe:
            {createDynamicLengthHTMLList("ol_type_1", recipe_data.steps)}
          </h6>
          { props.current_user === recipe_data.posted_by &&
            <div className="my-4 d-flex align-items-center justify-content-evenly">
              <Button
                type="button"
                variant="info"
                onClick={handleEditModalOpen}
              >
                Edit
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={handleDeleteModalOpen}
              >
                Delete
              </Button>
            </div>
          }
        </Card.Text>
      </Card>

      <div className="text-center text-secondary">
        <h6>Posted by: {recipe_data.posted_by}</h6>
      </div>


      {/* Modal for deleting a recipe */}
      <Modal show={deleteModalShow} onHide={handleDeleteModalClose}>
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title className="bg-light">Delete Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          Are you sure you want to delete this recipe for {clean_name}? This cannot be reversed if done.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleDeleteModalClose}>
            No, Don't Delete
          </Button>
          <Button variant="danger" onClick={handleRecipeDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>


      {/* Modal for editing a recipe */}
      <Modal show={editModalShow} onHide={handleEditModalClose}>
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title className="bg-light">Editing {clean_name}. Blanks Entries Will Not Be Altered</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>
                Edit Recipe Name:
              </Form.Label>
              <Form.Control
                type="text"
                name="name" 
                className="form-control"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>
                Edit Recipe Image &#40;JPEGs and PNGs only, file size limit of 6Mb&#41;:
              </Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/png, image/jpg, image/jpeg"
                multiple={false}
                onChange={isValidFile}
              />
            </Form.Group>
            <Form.Group controlId="ingredients">
              <Form.Label>
                Enter Ingredients &#40;Put commas between each entry&#41;:
              </Form.Label>
              <Form.Control
                type="text"
                name="ingredients"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="tools_needed">
              <Form.Label>
                Edit Tools Neeeded to Make &#40;Put commas between each entry&#41;:
              </Form.Label>
              <Form.Control
                type="text"
                name="tools_needed"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="steps">
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
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleRecipeEdit}>
            Submit Edits
          </Button>
          <Button variant="danger" onClick={handleEditModalClose}>
            Discard Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default RecipesGrid;