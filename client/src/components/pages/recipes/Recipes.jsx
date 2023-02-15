import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import Navigation from "../../Navigation";
import RecipesGrid from "./RecipesGrid";

function Recipes(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/recipe")
      .then(fetch_response => fetch_response.json())
      .then(fetch_data => setData(fetch_data.payload));
  }, []);

  return(
    <Container>
      <Navigation />

      <div className="text-secondary d-flex flex-column align-items-center">
        <h2>Featured Recipes</h2>
          {console.log(data)}
          {data && data.map((single_recipe) =>{
            return <RecipesGrid single_recipe={single_recipe} key={single_recipe.name} />
          }
          )}
      </div>
    </Container>
  )
}

export default Recipes;