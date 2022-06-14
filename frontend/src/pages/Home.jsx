import React, { useState, useEffect } from 'react';
import { getPlaylists, getMorePlaylists, token, logout } from '../spotify';

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
                <a
                    href={SPOTIFY_LOGIN_URL}
                >
                    Login with spotify
                </a>
                :
                <>
                    <div style={{ flexDirection: "row", display: "flex", justifyContent: "space-between" }}>
                        <p>Logged in</p>
                        <button onClick={logout} >Logout</button>
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
