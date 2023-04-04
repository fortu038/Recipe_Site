import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "./utils/AppContext";

import Homepage from "./pages/homepage/Homepage";
import Recipes from "./pages/recipes/Recipes";
import AddRecipe from "./pages/add-recipe/AddRecipe";
import UserLogin from "./pages/user-login/UserLogin";
import CreateAccount from "./pages/create-account/CreateAccount";

function Routing(props) {
  const { appState } = useAppContext();

  return(
    <Routes>
      <Route index element={<Homepage />}/>
      <Route path={"/recipes"} element={<Recipes />} />
      { !appState.user &&
        <>
          <Route path={"/login"} element={<UserLogin />} />
          <Route path={"/create"} element={<CreateAccount />} />
        </>
      }
      { appState.user &&
        <Route path={"/add"} element={<AddRecipe />} />
      }
      <Route path={"/add"} element={<Navigate to={"/login"}/>} />
      <Route path="*" element={<Navigate to={"/"}/>} />
    </Routes>
  )
}

export default Routing;