import React, { useState } from 'react';
import bcryptjs from "bcryptjs";
import { Container, Card, Button, Modal } from 'react-bootstrap';

function RecipesGrid (props) {
  let recipe_data = props.single_recipe;

  const [show, setShow] = useState(false);

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

  /**
   * Helper function that creates a list of a desired type using given data
   * @param {*} list_type The type of list to be created. Valid inputs are ul, ol_type_1, ol_type_a, ol_type_A, ol_type_i, and ol_type_I.
   * Any other entries will result in a console error being thrown.
   * @param {*} list_data The data the list is to be constructed from. If invalid data is entered a console error will be thrown.
   * @returns The HTML representing the desired list, or a console error if an invalid list type or invalid list data is entered.
   */
  function createDynamicLengthHTMLList(list_type, list_data) {
    if(list_data == null) {
      console.error("Invalid or no list data");
      return;
    }

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

  function handleEdit() {
    console.log("edited");
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

    setShow(false);

    window.location.reload();
    return false;
  };

  function handleModalOpen() {
    setShow(true);
  };

  function handleModalClose() {
    setShow(false);
  };

  const salt = bcryptjs.genSaltSync(10);
  var hashed_id = bcryptjs.hashSync(recipe_data._id, salt);

  // TODO: Make mobile screen container size w-50 and computer screen container size 2-75
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
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={handleModalOpen}
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

      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header className="bg-light" closeButton>
          <Modal.Title className="bg-light">Delete Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-light">
          Are you sure you want to delete this recipe for {clean_name}? This cannot be reversed if done.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            No, Don't Delete
          </Button>
          <Button variant="danger" onClick={handleRecipeDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default RecipesGrid;