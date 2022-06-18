import React, { useState, useEffect } from 'react';
import { getPlaylists, getMorePlaylists, token, logout } from '../spotify';
import { Button, Paper, Box, Typography, IconButton } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const SPOTIFY_LOGIN_URL = 'http://localhost:8888/login'
const SPOTIFY_PLAYLIST_PULL_LIMIT = 20;

const getAllPlaylists = async () => {
    try {
        const response = await getPlaylists()
        let { items, next, offset, total } = response.data;
        let all_playlists = [...items]
        while (total > (offset + SPOTIFY_PLAYLIST_PULL_LIMIT)) {
            let morePlaylistsResponse = await getMorePlaylists(next);
            ({ offset, next } = morePlaylistsResponse.data)
            all_playlists = all_playlists.concat(morePlaylistsResponse.data.items)
        }
        return all_playlists
    } catch (error) {
        console.log(error)
    }
}
export default function Home() {
    const [accessToken, setAccessToken] = useState('');
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        if (accessToken) {
            const allPlaylistsPromise = getAllPlaylists()

            allPlaylistsPromise.then(e => setPlaylists(e))
        }
    }, [accessToken])

    useEffect(() => {
        if (playlists) {
            console.log(playlists)
        }
    }, [playlists])


    useEffect(() => {
        setAccessToken(token);

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
                <>
                    <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between" }}>
                        <p>Logged in</p>
                        <IconButton
                            variant="outlined"
                            onClick={logout}>
                            Logout
                        </IconButton>

                    </div>
                    <div style={{ flexDirection: "column", display: "flex" }}>
                        {
                            playlists &&
                            playlists.map((playlist, idx) => <p key={`playlist-${idx}`}>{playlist.name}</p>)
                        }
                    </div>
                </>
            }
        </div>
    );
}
