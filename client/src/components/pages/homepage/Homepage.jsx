import React from 'react';
import { Container } from 'react-bootstrap';

import Navigation from "../../Navigation";

function Homepage() {
  return(
    <Container>
      <Navigation />

      <div className="text-secondary d-flex flex-column justify-content-center align-items-center">
        <h2>This is the Homepage</h2>
      </div>
    </Container>
  )
}

export default Homepage;