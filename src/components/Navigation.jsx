import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

function Navigation() {
  return(
    <Navbar collapseOnSelect expand="lg">
      <Container className="text-center">
        <Navbar.Brand>
          <h1>The Recipe Site</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/recipe-site"><h5>Home</h5></Nav.Link>
            <Nav.Link as={Link} to="/recipe-site-recipes"><h5>Recipes</h5></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    // <Navbar collapseOnSelect expand="lg">
    //   <Container className="text-center">
    //     <Navbar.Brand>
    //       <h1>My Portfolio</h1>
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //       <Navbar.Collapse id="responsive-navbar-nav">
    //         <Nav className="me-auto">
    //           <Nav.Link as={Link} to="/portfolio"><h5>About Me</h5></Nav.Link>
    //           <Nav.Link as={Link} to="/portfolio-projects"><h5>Projects</h5></Nav.Link>
    //           <Nav.Link as={Link} to="/portfolio-contactme"><h5>Contact Me</h5></Nav.Link>
    //           <Nav.Link as={Link} to="/portfolio-resume"><h5>Resume</h5></Nav.Link>
    //         </Nav>
    //       </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  )
}

export default Navigation