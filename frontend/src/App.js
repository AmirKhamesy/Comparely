
import React, { useState, useEffect } from 'react';
import { getPlaylists, token, logout } from './spotify';

const SPOTIFY_LOGIN_URL = 'http://localhost:8888/login'


const logPlaylist = async () => {
  try {
    const data = await getPlaylists()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

function App() {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    setAccessToken(token);
  }, []);

  return (
    <div >
      {!accessToken ?
        <a
          href={SPOTIFY_LOGIN_URL}
        >
          Login with spotify
        </a>
        :
        <>
          <p>Logged in</p>
          <p>{accessToken}</p>
          <button onClick={logPlaylist}>log</button>
          <button onClick={() => logout()} >Logout</button>
        </>
      }
    </div>
  );
}

export default App;
