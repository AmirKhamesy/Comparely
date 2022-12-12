import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { getMorePlaylists, getPlaylistMetadata } from "../spotify";
import InfiniteScroll from "react-infinite-scroll-component";

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
    // TODO: refactor this logic
    const songsOffset = data.data.tracks
      ? data.data.tracks.offset
      : data.data.offset;

    if (songsOffset === 0) {
      setSongs(data.data.tracks.items);
      setPlaylistMetaData(data.data);
      setLoading(false);
    } else {
      const updatedPlaylistMetadata = {
        ...playlistMetaData,
        tracks: data.data,
      };
      setPlaylistMetaData(updatedPlaylistMetadata);
      setSongs([...songs, ...data.data.items]);
    }
  };

  const fetchNextPage = () => {
    getMorePlaylists(playlistMetaData.tracks.next).then((data) =>
      setSongsAndMetadata(data)
    );
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
          <InfiniteScroll
            dataLength={songs.length} //This is important field to render the next data
            next={fetchNextPage}
            hasMore={songs.length < playlistMetaData.tracks.total}
            loader={
              <Box m={2} color="white" display="flex" justifyContent="center">
                <CircularProgress color="inherit" />
              </Box>
            }
          >
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
                      {song.track.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </InfiniteScroll>
        </Stack>
      )}
    </Box>
  );
}
