import axios from 'axios';
import { getHashParams } from '../utils';
import { CLIENT_BASE_URL } from '../lib/constants'

// Spotify variables
const SPOTIFY_PLAYLIST_PULL_LIMIT = 20;
export const SPOTIFY_LOGIN_URL = 'http://localhost:8888/login'

//Constants TODO: Move to confis/env file
const SERVER_URL = 'http://localhost:8888/'

// TOKENS ******************************************************************************************
const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds

const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalAccessToken = token => {
    setTokenTimestamp();
    window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

// Refresh the token
const refreshAccessToken = async () => {
    try {
        const refreshToken = getLocalRefreshToken();
        if (refreshToken) {
            const { data } = await axios.get(`${SERVER_URL}refresh_token?refresh_token=${refreshToken}`);
            const { access_token } = data;
            setLocalAccessToken(access_token);
            window.location.reload();
            return;
        }
    } catch (e) {
        console.error(e);
    }
};

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
    const { error, access_token, refresh_token } = getHashParams();

    if (error) {
        console.error(error);
        refreshAccessToken();
    }

    // If token has expired
    if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
        console.warn('Access token has expired, refreshing...');
        refreshAccessToken();
    }

    const localAccessToken = getLocalAccessToken();

    // If there is no ACCESS token in local storage, set it and return `access_token` from params
    if ((!localAccessToken || localAccessToken === 'undefined') && access_token) {
        setLocalAccessToken(access_token);
        setLocalRefreshToken(refresh_token);
        return access_token;
    }

    return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
    window.localStorage.removeItem('spotify_token_timestamp');
    window.localStorage.removeItem('spotify_access_token');
    window.localStorage.removeItem('spotify_refresh_token');
    window.location.replace(CLIENT_BASE_URL);
    // window.location.reload();
};

// API CALLS ***************************************************************************************

const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
};


/**
 * Get a List of Current User's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/
 */
export const getPlaylists = () => axios.get('https://api.spotify.com/v1/me/playlists', { headers });
export const getMorePlaylists = (next) => axios.get(next, { headers });
export const getAllPlaylists = async () => {
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


/**
 * Get a List of Current a playlists metadata
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist
 */
export const getPlaylistMetadata = (playlist_id) => axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}`, { headers });

