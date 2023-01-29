import './App.css';

import Routing from "./components/Routing";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routing />
    </Router>
  );
}

export default App;
