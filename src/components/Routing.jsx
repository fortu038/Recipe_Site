import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Homepage from "./pages/homepage/Homepage";

function Routing() {
  return(
    <Routes>
      <Route path="/Recipe_Site" element={<Homepage />}/>
      <Route path="*" element={<Navigate to="/Recipe_Site"/>} />
    </Routes>
  )
}

export default Routing;