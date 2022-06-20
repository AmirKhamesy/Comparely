import React, { useState, useEffect } from "react";
import { getAllPlaylists, token, logout, SPOTIFY_LOGIN_URL } from "../spotify";
import {
  Button,
  Paper,
  Box,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CircularProgress from "@mui/material/CircularProgress";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";

export default function Home() {
  const [accessToken, setAccessToken] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [position, setPosition] = React.useState({
    x: undefined,
    y: undefined,
  });

  useEffect(() => {
    if (accessToken) {
      // TODO: Get all user info
      // TODO: Store user info using redux
      const allPlaylistsPromise = getAllPlaylists();
      allPlaylistsPromise.then((e) => setPlaylists(e));
    }
  }, [accessToken]);

  useEffect(() => {
    if (playlists) {
      console.log(playlists);
    }
  }, [playlists]);

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
      {!accessToken ? (
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
              Login to begin
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
      ) : (
        <Box minHeight="100vh">
          <AppBar position="sticky" color="inherit">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Comparly
              </Typography>
              <Button color="inherit" onClick={logout}>
                <Typography>Sign out</Typography>
              </Button>
            </Toolbar>
          </AppBar>
          {playlists && playlists.length !== 0 ? (
            <Grid
              display="flex"
              container
              padding={1}
              columns={{ xs: 2, sm: 8, md: 12, lg: 16 }}
            >
              {playlists.map((playlist, idx) => (
                <Grid
                  align="center"
                  justify="center"
                  padding={2}
                  item
                  xs={2}
                  sm={4}
                  md={4}
                  key={`playlist-${idx}`}
                >
                  <Card sx={{ maxWidth: 250 }}>
                    <CardMedia
                      component="img"
                      height="250px"
                      image={`${
                        playlist.images[0]?.url && playlist.images[0].url
                          ? playlist.images[0].url
                          : "https://via.placeholder.com/250x250.png"
                      }`}
                    />
                    <CardContent>
                      <Tooltip title={playlist.name}>
                        <Typography
                          noWrap
                          tool={playlist.name}
                          variant="h6"
                          component="div"
                        >
                          {playlist.name}
                        </Typography>
                      </Tooltip>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              style={{
                marginTop: "40vh",
                marginLeft: "45%",
              }}
              color="white"
            >
              <CircularProgress color="inherit" />
            </Box>
          )}
        </Box>
      )}
    </div>
  );
}
