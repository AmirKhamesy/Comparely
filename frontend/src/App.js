
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
    <Router>
      <div >
        <Home></Home>
      </div>
    </Router>
  );
}

export default App;
