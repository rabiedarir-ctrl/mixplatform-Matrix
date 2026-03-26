'use strict';

# Dependencies
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

# Initialize App
const app = express();
const PORT = process.env.PORT || 3000;

# Middleware
app.use(cors());
app.use(express.json());

# Paths 
const storageDir = path.join(__dirname, 'storage');
const dataPath = path.join(storageDir, 'data.json');

# Ensure storage exists 
if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir);
}

if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify({
        social: [],
        store: [],
        wallet: [],
        games: [],
        metaverse: [],
        matrix: []
    }, null, 2));
}

# Helper Functions 
function readData() {
    try {
        return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    } catch (error) {
        console.error("Read Error:", error);
        return {
            social: [],
            store: [],
            wallet: [],
            games: [],
            metaverse: [],
            matrix: []
        };
    }
}

function writeData(data) {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Write Error:", error);
    }
}
# Generate Unique ID
function generateId() {
    return Date.now();
}

# API Routes 

# Health 
app.get('/health', (req, res) => {
    res.json({ status: "Mix Platform Alive"});
});

# Generic Helper 
function createPostHandler(key) {
    return (req, res) => {
        const data = readData();
        const newItem = { id: generateId(), ...req.body };
        data[key].push(newItem);
        writeData(data);
        res.status(201).json(newItem);
    };
}

function createGetHandler(key) {
    return (req, res) => {
        const data = readData();
        res.json(data[key]);
    };
}

# Routes 
app.get('/api/social', createGetHandler('social'));
app.post('/api/social', createPostHandler('social'));

app.get('/api/store', createGetHandler('store'));
app.post('/api/store', createPostHandler('store'));

app.get('/api/wallet', createGetHandler('wallet'));
app.post('/api/wallet', createPostHandler('wallet'));

app.get('/api/games', createGetHandler('games'));
app.post('/api/games', createPostHandler('games'));

app.get('/api/metaverse', createGetHandler('metaverse'));
app.post('/api/metaverse', createPostHandler('metaverse'));

app.get('/api/matrix', createGetHandler('matrix'));
app.post('/api/matrix', createPostHandler('matrix'));

# Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

# Start Server 
app.listen(PORT, () => {
    console.log(Mix Platform API running on http://localhost:${PORT}`);
});
