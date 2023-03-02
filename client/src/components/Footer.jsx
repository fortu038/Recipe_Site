import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from 'react-bootstrap';

function Footer() {
  return(
    <Container>
      <div className="d-flex justify-content-evenly align-items-center">
        <a href="https://github.com/fortu038/Recipe_Site"> 
          <img 
            className="Footer-Image"
            src={require("../assets/images/GitHub-Mark-64px.png")} 
            alt="The logo for GitHub. Clicking on it will redirect to the Github repo for this site."
          />
        </a>
        <a href="https://www.linkedin.com/in/conor-fortuna-03b995248/"> 
          <img 
            className="Footer-Image"
            src={require("../assets/images/linkedin-logo.png")} 
            alt="The logo for LinkedIn. Clicking on it will redirect to the site designer's LinkedIn account."
          />
        </a>
      </div>
    </Container>
  )
}

export default Footer;