import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/homepage/Homepage";
import Recipes from "./pages/recipes/Recipes";

const site_name = "The Online Cookbook";

function Routing(props) {
  return(
    <Routes>
      <Route path={`/${site_name.replace(/\s/g, "")}`} element={<Homepage />}/>
      <Route path={`/${site_name.replace(/\s/g, "")}-recipes`} element={<Recipes featured_recipes={props.featured_recipes}/>} />
      <Route path="*" element={<Navigate to={`/${site_name.replace(/\s/g, "")}`}/>} />
    </Routes>
  )
}

export default Routing;