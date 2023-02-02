import './App.css';

import Routing from "./components/Routing";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

const featured_recipes = [
  {
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
