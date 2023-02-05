import './App.css';

import Routing from "./components/Routing";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

// This is a placeholder data set until database is set up
const featured_recipes = [
  {
    image: require("./assets/images/simple_placeholder.jpg"),
    alt_text: "This is a placeholder",
    recipe_name: "Good Ol' PB&J",
    recipe_ingredients: [
      "2 pieces of bread",
      "Some jelly",
      "Some peanut butter"
    ],
    recipe_tools_needed: [
      "Knife"
    ],
    recipe_steps: [
      "Coat one side of one of the bread pieces in jelly",
      "Coat one side of the other of the bread pieces in peanut butter",
      "Optional: Remove breadcrust"
    ],
    tags: [
      "VEGAN",
      "VEGETARIAN",
      "EASY_TO_MAKE"
    ]
  },
  {
    image: require("./assets/images/simple_placeholder.jpg"),
    alt_text: "This is a placeholder",
    recipe_name: "1_Test_Recipe",
    recipe_ingredients: [
      "Ingredient 1",
      "Ingredient 2",
      "Ingredient 3"
    ],
    recipe_tools_needed: [
      "Tool 1",
      "Tool 2",
      "Tool 3"
    ],
    recipe_steps: [
      "Step 1",
      "Step 2",
      "Step 3"
    ],
    tags: [
      "EASY_TO_MAKE",
      "TEST_RECIPE"
    ]
  }
]

function App() {
  return (
    <Router>
      <Routing featured_recipes={featured_recipes}/>
    </Router>
  );
}

export default App;
