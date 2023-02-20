import './App.css';

import Routing from "./components/Routing";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from './components/utils/AppContext';

function App() {
  return (
    <Router>
      <AppProvider>
        <Routing />
      </AppProvider>
    </Router>
  );
}

export default App;
