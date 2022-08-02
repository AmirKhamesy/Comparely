import React from "react";
import { useParams } from "react-router-dom";

export default function SpotifyPlaylist() {
  const { playlistID } = useParams();

  return <div>SpotifyPlaylist{playlistID}</div>;
}
