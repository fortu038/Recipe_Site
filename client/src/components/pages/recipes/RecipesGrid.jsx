import React from 'react';
import bcryptjs from "bcryptjs";
import { Container, Card, Button, Modal } from 'react-bootstrap';

// TODO: Make secuirty for individual entries better by encrypting the recipe IDs when they are used in the tag IDs

function RecipesGrid (props) {
  let recipe_data = props.single_recipe;

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

  function handleDelete() {
    console.log("deleted");
  }

  const salt = bcryptjs.genSaltSync(10);
  var hashed_id = bcryptjs.hashSync(recipe_data._id, salt);

  return(
    // <div className="Recipe-Box border bg-light">
    //   <div className="mt-4 text-center">
    //     <img
    //       className="img-fluid"
    //       src={recipe_data.image}
    //       alt={recipe_data.alt_text}
    //     />
    //   </div>
    //   <div className="mt-4">
    //     <h4 className="text-center">
    //       {clean_name}
    //     </h4>

    //     {/* 
    //       Maybe have a tag list later on for recipes features such as gluten-free or vegan.
    //       Having tags in the background could allow for easier suggestion making and searches.
    //     */}
    //     {/* <h6>
    //       Tags:

    //     </h6> */}

    //     <div className="text-center">
    //       <button
    //         id={`show-button-${hashed_id}`}
    //         type="button"
    //         className="btn btn-outline-secondary"
    //         onClick={showInfoSection}
    //         hidden={false}
    //       >
    //         Show Info
    //       </button>
    //       <button
    //         id={`hide-button-${hashed_id}`}
    //         type="button"
    //         className="btn btn-outline-secondary"
    //         onClick={hideInfoSection}
    //         hidden={true}
    //       > 
    //         Hide Info
    //       </button>
    //     </div>

    //     <div id={`info-section-${hashed_id}`} hidden={true}>
    //       <h6>
    //         Ingredients:
    //         {createDynamicLengthHTMLList("ul", recipe_data.ingredients)}
    //       </h6>
    //       <h6>
    //         Tools Needed to Make:
    //         {createDynamicLengthHTMLList("ul", recipe_data.tools_needed)}
    //       </h6>
    //       <h6>
    //         Recipe:
    //         {createDynamicLengthHTMLList("ol_type_1", recipe_data.steps)}
    //       </h6>
    //       <div>
    //         <button
    //           type="button"
    //           className="btn btn-outline-info"
    //           onClick={console.log("edit")}
    //         >
    //           Edit
    //         </button>
    //         <button
    //           type="button"
    //           className="btn btn-outline-danger"
    //           onClick={console.log("delete")}
    //         >
    //           Delete
    //         </button>
    //       </div>
    //     </div>

    //   </div>

    //   <div className="text-center text-secondary">
    //     <h6>Posted by: {recipe_data.posted_by}</h6>
    //   </div>

    // </div>
    <Container className="my-4 w-75 bgStandard">
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
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Card.Text>
      </Card>

      <div className="text-center text-secondary">
        <h6>Posted by: {recipe_data.posted_by}</h6>
      </div>
    </Container>
  )
}

export default RecipesGrid;