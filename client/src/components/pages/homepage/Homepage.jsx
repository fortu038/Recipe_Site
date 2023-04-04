import React from 'react';
import { Container } from 'react-bootstrap';

import Navigation from "../../Navigation";

function Homepage() {
  return(
    <div className="bgStandard">
      <Navigation />

      <Container className="text-secondary d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center">
          Welcome to the Online Cookbook! Browse our recipes or login to add your own.
        </h2>
      </Container>
    </div>
  )
}

export default Homepage;