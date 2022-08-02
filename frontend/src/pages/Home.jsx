import React, { useState, useEffect, useCallback } from "react";
import { token, SPOTIFY_LOGIN_URL } from "../spotify";
import { Button, Paper, Box, Typography } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [accessToken, setAccessToken] = useState("");

  const navigate = useNavigate();
  const navigateToSpotifyPage = useCallback(
    () => navigate("/Spotify"),
    [navigate]
  );

  useEffect(() => {
    if (accessToken) {
      // TODO: Get all user info
      // TODO: Store user info using redux
      navigateToSpotifyPage();
    }
  }, [accessToken]);

  const removeHash = () => {
    window.history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  };

  useEffect(() => {
    setAccessToken(token);
    removeHash();
  }, []);

  return (
    <div>
      {!accessToken && (
        <Box
          display="flex"
          flexDirection="column"
          gap="2vh"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Box>
            <Typography
              variant="h2"
              style={{
                fontWeight: "400",
                fontFamily: "Roboto",
                color: "White",
              }}
            >
              Sign in
            </Typography>
          </Box>
          <Paper elevation={5}>
            <Button
              variant="outlined"
              href={SPOTIFY_LOGIN_URL}
              startIcon={<MusicNoteIcon color="success" />}
              color="success"
            >
              Spotify
            </Button>
          </Paper>
        </Box>
      )}
    </div>
  );
}
