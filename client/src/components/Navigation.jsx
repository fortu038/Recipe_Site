import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const site_name = "The Online Cookbook";
const url_name = site_name.replace(/\s/g, "");

function Navigation() {
  return(
    <Navbar collapseOnSelect expand="lg">
      <Container className="text-center">
        <Navbar.Brand>
          <h1>The Online Cookbook</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={`/${url_name}`}>
              <h5>Home</h5>
            </Nav.Link>
            <Nav.Link as={Link} to={`/${url_name}-recipes`}>
              <h5>Recipes</h5>
            </Nav.Link>
            <Nav.Link as={Link} to={`/${url_name}-add`}>
              <h5>Add Recipe</h5>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation