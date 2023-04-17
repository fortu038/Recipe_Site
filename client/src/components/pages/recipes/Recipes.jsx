import React, { useState, useEffect } from "react";

import Navigation from "../../Navigation";
import RecipesGrid from "./RecipesGrid";

import { useAppContext } from "../../utils/AppContext";

function Recipes(props) {
  const { appState } = useAppContext();

  const [data, setData] = useState(null);

  let current_user = null;

  if(appState.user != undefined && appState.user != null) {
    current_user = appState.user.username;
  }

  useEffect(() => {
    fetch("/api/recipe")
      .then(fetch_response => fetch_response.json())
      .then(fetch_data => setData(fetch_data.payload));
  }, []);

  return(
    <div className="bgStandard">
      <Navigation />

      <div className="text-secondary d-flex flex-column align-items-center">
        <h2>Recipes</h2>
          {data && data.map((single_recipe) =>{
            return <RecipesGrid single_recipe={single_recipe} current_user={current_user} key={single_recipe.name} />
          }
          )}
      </div>
    </div>
  )
}

export default Recipes;