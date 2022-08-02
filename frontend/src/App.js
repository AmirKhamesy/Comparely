
import React from 'react';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { styled } from '@mui/system';
import Spotify from './pages/Spotify';
import SpotifyPlaylist from './pages/SpotifyPlaylist';

// https://github.com/johnpolacek/animated-gradient-background-generator
// TODO: Fix animation
// TODO: Move to css files?
const StyledBackgroundWrapper = styled('div')({
  background: "linear-gradient(247deg,#b600ff,#2907df)",
  backgroundSize: "120% 120%",
  animation: "gradient-animation 6s ease infinite",
  width: "100%",
  height: "100%",

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
    <>
      {/* https://mui.com/material-ui/getting-started/installation/#font-icons */}
      < link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Router>
        <StyledBackgroundWrapper >
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='Spotify' element={<Spotify />}>
              <Route path=':playlistID' element={<SpotifyPlaylist />} />
            </Route>

          </Routes>
        </StyledBackgroundWrapper>
      </Router>
    </>
  );
}

export default App;
