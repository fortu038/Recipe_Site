import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "./utils/AppContext";

import Homepage from "./pages/homepage/Homepage";
import Recipes from "./pages/recipes/Recipes";
import AddRecipe from "./pages/add-recipe/AddRecipe";
import UserLogin from "./pages/user-login/UserLogin";
import CreateAccount from "./pages/create-account/CreateAccount";

const site_name = "The Online Cookbook";
const url_name = site_name.replace(/\s/g, "");

function Routing(props) {
  const { appState } = useAppContext();

  return(
    <Routes>
      <Route path={`/${url_name}`} element={<Homepage />}/>
      <Route path={`/${url_name}-recipes`} element={<Recipes />} />
      { !appState.user &&
        <>
          <Route path={`/${url_name}-login`} element={<UserLogin />} />
          <Route path={`/${url_name}-create`} element={<CreateAccount />} />
        </>
      }
      { appState.user &&
        <Route path={`/${url_name}-add`} element={<AddRecipe />} />
      }
      <Route path={`/${url_name}-add`} element={<Navigate to={`/${url_name}-login`}/>} />
      <Route path="*" element={<Navigate to={`/${url_name}`}/>} />
    </Routes>
  )
}

export default Routing;