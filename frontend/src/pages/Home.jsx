import React, { useState, useEffect } from 'react';
import { getAllPlaylists, token, logout, SPOTIFY_LOGIN_URL } from '../spotify';
import { Button, Paper, Box, Typography, IconButton, Toolbar, AppBar, Card, CardMedia, CardContent, Grid } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CircularProgress from '@mui/material/CircularProgress';
import MenuIcon from '@mui/icons-material/Menu';



export default function Home() {
    const [accessToken, setAccessToken] = useState('');
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        if (accessToken) {
            // TODO: Get all user info
            // TODO: Store user info using redux
            const allPlaylistsPromise = getAllPlaylists()
            allPlaylistsPromise.then(e => setPlaylists(e))
        }
    }, [accessToken])

    useEffect(() => {
        if (playlists) {
            console.log(playlists)
        }
    }, [playlists])

    const removeHash = () => {
        window.history.pushState("", document.title, window.location.pathname
            + window.location.search);
    }

    useEffect(() => {
        setAccessToken(token);
        removeHash();
    }, []);

    return (
        <div >
            {!accessToken ?
                <Box
                    display="flex"
                    flexDirection="column"
                    gap="2vh"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="100vh"
                >
                    <Box>

                        <Typography variant="h2" style={{ fontWeight: "400", fontFamily: "Roboto", color: "White" }}>
                            Login to begin
                        </Typography>
                    </Box>
                    <Paper elevation={5}>
                        <Button variant="outlined"
                            href={SPOTIFY_LOGIN_URL}
                            startIcon={<MusicNoteIcon color="success" />}
                            color="success"
                        >
                            Spotify
                        </Button>
                    </Paper>
                </Box>
                :
                <Box
                    minHeight="100vh"
                >
                    <AppBar position="static" color="inherit">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Comparly
                            </Typography>
                            <Button color="inherit" onClick={logout}>
                                <Typography>
                                    Sign out
                                </Typography>
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Box>
                        {
                            playlists && playlists.length !== 0 ?
                                <Box margin={2} border='10px solid red' >
                                    <Grid container spacing={2}>

                                        {
                                            playlists.map((playlist, idx) =>
                                                <Grid item sm={12} m={3} key={`playlist-${idx}`}>
                                                    <Card sx={{ maxWidth: 345 }} >
                                                        <CardMedia
                                                            component="img"
                                                            height="140"
                                                            image={`${playlist.images[0]?.url && playlist.images[0].url ?
                                                                playlist.images[0].url
                                                                :
                                                                'https://via.placeholder.com/345x140.png'
                                                                }`}
                                                        />
                                                        <CardContent>
                                                            <Typography variant="h6" component="div">
                                                                {playlist.name}
                                                            </Typography>

                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            )
                                        }
                                    </Grid>
                                </Box>
                                :
                                <Box
                                    style={{
                                        marginTop: "40%",
                                        marginLeft: "45%"
                                    }}
                                    color='white'>
                                    <CircularProgress color="inherit" />
                                </Box>
                        }
                    </Box>
                </Box>
            }
        </div >
    );
}
