import React from 'react'

function RecipesGrid (props) {
  let recipe_data = props.data;

  console.log("recipe_data is:\n");
  console.log(recipe_data);

  return(
    <div className="align-items-center">
      {/* <div className="mt-4 text-center">
        <img
          src={props.data.image}
          alt={props.data.altText}
          className="Recipe-Img"
        />
      </div> */}
      <div className="mt-4">
        <h6 className="text-center">
          Name: {recipe_data.recipe_name}
        </h6>
        {/* 
          Maybe have a tag list later on for recipes features such as gluten-free or vegan.
          Having tags in the background could allow for easier suggestion making and searches.
        */}
        {/* <h6>
          Tags:
          <ul>

          </ul>
        </h6> */}
        <h6>
          Ingredients:
          <ul>
            {/* Make this and the copy and pasted versions into a separate function later */}
            {recipe_data.recipe_ingredients.map((item, index) => {
                return <li key={index}>{item}</li>
              }
            )}
          </ul>
        </h6>
        <h6>
          Tools Needed to Make:
          <ul>
            {recipe_data.recipe_tools_needed.map((item, index) => {
                return <li key={index}>{item}</li>
              }
            )}
          </ul>
        </h6>
        <h6>
          Recipe:
          <ol type="1">
            {recipe_data.recipe_steps.map((step, index) => {
                return <li key={index}>{step}</li>
              }
            )}
          </ol>
        </h6>
      </div>
    </div>
  )
}

export default RecipesGrid;