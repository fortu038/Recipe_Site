import React from 'react'

function RecipesGrid (props) {
  let recipe_data = props.single_recipe;

  const rough_name = recipe_data.name;
  const clean_name = rough_name.replace(/_/g, " ");

  console.log("recipe_data is:\n");
  console.log(recipe_data);

  function hideInfoSection() {
    console.log("Hide it!");
    document.getElementById(`info-section-${rough_name}`).hidden = true;
    document.getElementById(`hide-button-${rough_name}`).hidden = true;
    document.getElementById(`show-button-${rough_name}`).hidden = false;
  }
  
  function showInfoSection() {
    console.log("Show it!");
    document.getElementById(`info-section-${rough_name}`).hidden = false;
    document.getElementById(`hide-button-${rough_name}`).hidden = false;
    document.getElementById(`show-button-${rough_name}`).hidden = true;
  }

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
    )

    if(list_type === "ul") {
      return <ul>{list_items}</ul>
    }
    else if(list_type === "ol_type_1") {
      return <ol type="1">{list_items}</ol>
    }
    else if(list_type === "ol_type_a") {
      return <ol type="a">{list_items}</ol>
    }
    else if(list_type === "ol_type_A") {
      return <ol type="A">{list_items}</ol>
    }
    else if(list_type === "ol_type_i") {
      return <ol type="i">{list_items}</ol>
    }
    else if(list_type === "ol_type_I") {
      return <ol type="I">{list_items}</ol>
    }
    else {
      console.error(`Invalid list type ${list_type}: Use only ul, ol_type_1, ol_type_a, ol_type_A, ol_type_i, or ol_type_I`);
      return;
    }
  }

  // Note: This is a temporary fix until I can figure out how to store images in MongoDB
  const recipe_image = require("../../../assets/images/simple_placeholder.jpg");

  return(
    <div className="Recipe-Box border bg-light">
      <div className="mt-4 text-center">
        <img
          className="img-fluid"
          src={recipe_image}
          alt={recipe_data.alt_text}
        />
      </div>
      <div className="mt-4">
        <h4 className="text-center">
          {clean_name}
        </h4>

        {/* 
          Maybe have a tag list later on for recipes features such as gluten-free or vegan.
          Having tags in the background could allow for easier suggestion making and searches.
        */}
        {/* <h6>
          Tags:

        </h6> */}

        <div className="text-center">
          <button
            id={`show-button-${rough_name}`}
            type="button"
            className="btn btn-outline-secondary"
            onClick={showInfoSection}
            hidden={false}
          >
            Show Info
          </button>
          <button
            id={`hide-button-${rough_name}`}
            type="button"
            className="btn btn-outline-secondary"
            onClick={hideInfoSection}
            hidden={true}
          > 
            Hide Info
          </button>
        </div>

        <div id={`info-section-${rough_name}`} hidden={true}>
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
        </div>

      </div>

      <div className="text-center text-secondary">
        <h6>Posted by: {recipe_data.posted_by}</h6>
      </div>

    </div>
  )
}

export default RecipesGrid;