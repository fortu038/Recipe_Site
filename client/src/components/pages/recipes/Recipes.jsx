import React from "react";
import { Container } from "react-bootstrap";

import Navigation from "../../Navigation";
import RecipesGrid from "./RecipesGrid";

function Recipes(props) {
  return(
    <Container>
      <Navigation />

      <div className="text-secondary d-flex flex-column align-items-center">
        <h2>Featured Recipes</h2>
        {/* <div className="row d-flex justify-content-center"> */}
          {console.log(props.featured_recipes)}
            {props.featured_recipes.map((data) =>{
              return (
                <div className="p-2">
                  <RecipesGrid data={data} key={data.recipe_name.replace(" ", "_")} />
                </div>
              )
            }
          )}
        {/* </div> */}
      </div>
    </Container>
  )
}

export default Recipes;