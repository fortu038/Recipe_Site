import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { useAppContext } from "./utils/AppContext";
import Cookie from "js-cookie";

const site_name = "The Online Cookbook";
const url_name = site_name.replace(/\s/g, "");

function Navigation() {
  const { appState, setAppState } = useAppContext();

  const handleLogout = async (e) => {
    e.preventDefault();
    const lookupCheck = await fetch("/api/user/lookup", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    const lookupResult = await lookupCheck.json();

    // If the login was good, save the returned token as a cookie
    if( lookupResult.result === "success" ){
      Cookie.remove("auth-token", lookupResult.token)
      setAppState({...appState, user: lookupResult.user})
    }
  }

  return(
    <div className="bgNav">
      <Navbar collapseOnSelect expand="lg">
        <Container className="text-center">
          <Navbar.Brand>
            <h1>{site_name}</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/"}>
                <h5 className="NavLink">Home</h5>
              </Nav.Link>
              <Nav.Link as={Link} to={"/recipes"}>
                <h5 className="NavLink">Recipes</h5>
              </Nav.Link>
              {appState.user &&
                <>
                  <Nav.Link as={Link} to={"/add"}>
                    <h5 className="NavLink">Add Recipe</h5>
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout}>
                    <h5 className="NavLink">Log Out</h5>
                  </Nav.Link>
                </>
              }
              {!appState.user &&
                <Nav.Link as={Link} to={"/login"}>
                  <h5 className="NavLink">Login or Create an Account</h5>
                </Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Navigation