import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import querystring from 'querystring';
import cookieParser from 'cookie-parser';
dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const stateKey = 'spotify_auth_state';
let REDIRECT_URI = 'http://localhost:8888/callback';
let FRONTEND_URI = 'http://localhost:3000';
const PORT = 8888;

const app = express();

app.use(cors())
    .use(cookieParser())


/** 
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};



app.get('/login', function (req, res) {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);
    // your application requests authorization
    const scope =
        'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';

    res.redirect(
        `https://accounts.spotify.com/authorize?${querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: FRONTEND_URI,
            state: state,
        })}`,
    );
});


app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log('listening on port', PORT);
});