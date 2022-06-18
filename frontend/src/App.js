
import React from 'react';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { styled } from '@mui/system';

// https://github.com/johnpolacek/animated-gradient-background-generator
const StyledBackgroundWrapper = styled('div')({
  background: "linear-gradient(89deg,#1507ab,#f21665)",
  backgroundSize: "120% 120%",
  animation: "gradient-animation 10s ease infinite",

  "@keyframes gradient-animation": {
    '0%': {
      backgroundPosition: "0% 50%"
    },
    "50%": {
      backgroundPosition: "100% 50%"
    },
    "100%": {
      backgroundPosition: "0% 50%"
    }
  }
})


function App() {

  return (
    <StyledBackgroundWrapper >
      {/* https://mui.com/material-ui/getting-started/installation/#font-icons */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Router>
        <Home></Home>
      </Router>
    </StyledBackgroundWrapper>
  );
}

export default App;
