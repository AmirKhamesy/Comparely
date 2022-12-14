import React from "react";
import { Typography, Stack } from "@mui/material";

const SongItem = ({ song }) => {
  return (
    <Stack
      bgcolor={"#9AA0AD99"}
      p={2}
      spacing={3}
      borderRadius={3}
      direction="row"
      alignItems="center"
    >
      <img src={song.track.album.images[2].url} alt={song.track.name} />
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
  );
};

export default SongItem;
