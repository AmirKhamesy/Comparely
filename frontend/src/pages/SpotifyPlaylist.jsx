import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { getPlaylistItems, getPlaylistMetadata } from "../spotify";

export default function SpotifyPlaylist() {
  const { playlistID } = useParams();
  const [songs, setSongs] = useState([]);
  const [playlistMetaData, setPlaylistMetaData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPlaylistMetadata(playlistID).then((data) => setSongsAndMetadata(data));
    setLoading(false);
  }, []);

  const setSongsAndMetadata = (data) => {
    setSongs(data.data.tracks.items);
    setPlaylistMetaData(data.data);
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
        <Stack sx={{ border: "2px solid red" }} p={3}>
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
            {playlistMetaData.tracks.total}
          </Typography>
          <Stack spacing={2}>
            {songs.map((song, idx) => (
              <Box
                bgcolor="#9AA0AD"
                sx={{ opacity: 0.75 }}
                p={2}
                borderRadius={3}
                key={`song-${idx}`}
              >
                <Typography variant="h4">{song.track.name}</Typography>
                <Typography>
                  {song.track.artists.map((artist) => artist.name).join(", ")}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
