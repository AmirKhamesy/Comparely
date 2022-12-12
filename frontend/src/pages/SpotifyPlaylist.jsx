import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { getMorePlaylists, getPlaylistMetadata } from "../spotify";

export default function SpotifyPlaylist() {
  const { playlistID } = useParams();
  const [songs, setSongs] = useState([]);
  const [playlistMetaData, setPlaylistMetaData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPlaylistMetadata(playlistID).then((data) => setSongsAndMetadata(data));
  }, [playlistID]);

  const setSongsAndMetadata = (data) => {
    setSongs(data.data.tracks.items);
    setPlaylistMetaData(data.data);
    getMorePlaylists(data.data.tracks.next).then((data) => console.log(data));
    setLoading(false);
  };

  return (
    <Box>
      {loading ? (
        <Box
          style={{
            marginTop: "40vh",
            marginLeft: "45%",
          }}
          color="white"
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Stack p={3}>
          <Stack m={2}>
            <Typography
              variant="h2"
              fontWeight="bold"
              color="White"
              textAlign="center"
              m={3}
              sx={{ flexGrow: 1 }}
            >
              {playlistMetaData.name}
            </Typography>
            <Typography color="White" textAlign="center">
              {playlistMetaData.tracks.total} song
              {playlistMetaData.tracks.total.length !== 1 && "s"}
            </Typography>
          </Stack>
          <Stack spacing={2}>
            {songs.map((song, idx) => (
              <Stack
                bgcolor={"#9AA0AD99"}
                p={2}
                spacing={3}
                borderRadius={3}
                key={`song-${idx}`}
                direction="row"
                alignItems="center"
              >
                <img
                  src={song.track.album.images[2].url}
                  alt={song.track.name}
                />
                {/* TODO: Choose image size thats appropriate for the screen size*/}
                <Stack>
                  <Typography variant="h6" color="white">
                    {song.track.name}
                  </Typography>
                  <Typography color="#FFFFFF90">
                    {song.track.artists.map((artist) => artist.name).join(", ")}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
