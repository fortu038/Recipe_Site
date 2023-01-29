import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/homepage/Homepage";
import Recipes from "./pages/recipes/Recipes";

function Routing() {
  return(
    <Routes>
      <Route path="/recipe-site" element={<Homepage />}/>
      <Route path="/recipe-site-recipes" element={<Recipes />} />
      <Route path="*" element={<Navigate to="/recipe-site"/>} />
    </Routes>
  )
}

export default Routing;