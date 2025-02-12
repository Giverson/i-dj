const axios = require('axios');
require('dotenv').config();

const SPOTIFY_URL = 'https://api.spotify.com/v1';

async function getAccessToken() {
    const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            client_secret: process.env.SPOTIFY_CLIENT_SECRET
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return response.data.access_token;
}

async function searchTrack(query) {
    const accessToken = await getAccessToken(); // Obtém o token antes de buscar músicas
    const response = await axios.get(`${SPOTIFY_URL}/search`, {
        params: { q: query, type: 'track', limit: 10 },
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    return response.data.tracks.items.map(track => ({
        name: track.name,
        artist: track.artists.map(a => a.name).join(', '),
        url: track.external_urls.spotify,
        preview: track.preview_url
    }));
}

module.exports = { searchTrack };
