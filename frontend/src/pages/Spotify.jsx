import React, { useState, useEffect, useCallback } from "react";
import { getAllPlaylists, token, logout } from "../spotify";
import {
  Button,
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
import CircularProgress from "@mui/material/CircularProgress";
import MenuIcon from "@mui/icons-material/Menu";
import Tooltip from "@mui/material/Tooltip";
import { Link, useNavigate, Outlet } from "react-router-dom";
import SpotifyPlaylist from "./SpotifyPlaylist";

export default function Spotify() {
  const [accessToken, setAccessToken] = useState("");
  const [playlists, setPlaylists] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      // TODO: Get all user info
      // TODO: Store user info using redux
      const allPlaylistsPromise = getAllPlaylists();
      allPlaylistsPromise.then((e) => setPlaylists(e));
    }
  }, [accessToken]);

  //   useEffect(() => {
  //     if (playlists) {
  //       console.log(playlists);
  //     }
  //   }, [playlists]);

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
      {accessToken && (
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
          {
            // TODO: Dont display Parent routes
            // Checks to see if the there is a playlist ID at the end of the URL
            window.location.pathname.split("/Spotify/").length > 1 &&
            window.location.pathname.split("/Spotify/")[1].length > 0 ? (
              <Outlet />
            ) : (
              <>
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
                        <Link
                          key={`playlist-link-${idx}`}
                          to={`${playlist.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Card sx={{ maxWidth: 250 }}>
                            <CardMedia
                              component="img"
                              height="250px"
                              image={`${
                                playlist.images[0]?.url &&
                                playlist.images[0].url
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
                        </Link>
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
              </>
            )
          }
        </Box>
      )}
    </div>
  );
}
