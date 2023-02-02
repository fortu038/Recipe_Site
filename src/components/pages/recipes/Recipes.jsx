import React from "react";
import { Container } from "react-bootstrap";

import Navigation from "../../Navigation";
import RecipesGrid from "./RecipesGrid";

function Recipes(props) {
  return(
    <Container>
      <Navigation />

      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2>Featured Recipes</h2>
        {/* <RecipesGrid /> */}
        {console.log(props.featured_recipes)}
          {props.featured_recipes.map((data) =>{
              return <RecipesGrid data={data} key={data.recipe_name.replace(" ", "_")} />
            }
          )}
      </div>
    </Container>
  )
}

export default Recipes;