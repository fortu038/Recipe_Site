import React from 'react'

function RecipesGrid (props) {
  let recipe_data = props.data;

  // console.log("recipe_data is:\n");
  // console.log(recipe_data);

  /**
   * Helper function that creates a list of a desired type using given data
   * @param {*} list_type The type of list to be created. Valid inputs are ul, ol_type_1, ol_type_a, ol_type_A, ol_type_i, and ol_type_I.
   * Any other entries will result in a console error being thrown.
   * @param {*} list_data The data the list is to be constructed from. If invalid data is entered a console error will be thrown.
   * @returns The HTML representing the desired list, or a console error if an invalid list type or invalid list data is entered.
   */
  function Create_Dynamic_Length_HTML_List(list_type, list_data) {
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

  return(
    <div className="Recipe-Box border bg-light">
      <div className="mt-4 text-center">
        <img
          className="img-fluid"
          src={recipe_data.image}
          alt={recipe_data.alt_text}
        />
      </div>
      <div className="mt-4">
        <h4 className="text-center">
          {recipe_data.recipe_name}
        </h4>
        {/* 
          Maybe have a tag list later on for recipes features such as gluten-free or vegan.
          Having tags in the background could allow for easier suggestion making and searches.
        */}
        {/* <h6>
          Tags:

        </h6> */}
        <h6>
          Ingredients:
          {Create_Dynamic_Length_HTML_List("ul", recipe_data.recipe_ingredients)}
        </h6>
        <h6>
          Tools Needed to Make:
          {Create_Dynamic_Length_HTML_List("ul", recipe_data.recipe_tools_needed)}
        </h6>
        <h6>
          Recipe:
          {Create_Dynamic_Length_HTML_List("ol_type_1", recipe_data.recipe_steps)}
        </h6>
      </div>
      <div className="text-center text-secondary">
        <h6>Posted by: {recipe_data.posted_by}</h6>
      </div>
    </div>
  )
}

export default RecipesGrid;