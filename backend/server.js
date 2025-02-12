require('dotenv').config();
const express = require('express');
const cors = require('cors');
const spotify = require('./spotify');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

app.get('/search', async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Query is required' });

    try {
        const results = await spotify.searchTrack(query);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Spotify API error' });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'))