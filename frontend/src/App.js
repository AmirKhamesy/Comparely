
import React, { useState, useEffect } from 'react';
import { getPlaylists, token, logout } from './controllers/spotify';

const SPOTIFY_LOGIN_URL = 'http://localhost:8888/login'


const logPlaylist = async () => {
  const data = await getPlaylists()
  console.log(data)
}

function App() {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    setAccessToken(token);
  }, []);

  useEffect(() => {
    accessToken && accessToken !== '' &&
      logPlaylist()
  }, [accessToken]);

  return (
    <div >
      {accessToken ?
        <a
          href={SPOTIFY_LOGIN_URL}
        >
          Login with spotify
        </a>
        :
        <>
          <p>Logged in</p>
          <button onClick={() => logout()} >Logout</button>
        </>
      }
    </div>
  );
}

export default App;
