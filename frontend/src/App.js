
import React from 'react';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
    <div >
      {/* https://mui.com/material-ui/getting-started/installation/#font-icons */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Router>
        <Home></Home>
      </Router>
    </div>
  );
}

export default App;
