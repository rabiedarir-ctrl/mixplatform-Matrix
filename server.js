'use strict';

// ==== Dependencies ====
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// ==== Initialize App ====
const app = express();
const PORT = process.env.PORT || 3000;

// ==== Middleware ====
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// ==== Data Storage (JSON files) ====
const dataPath = path.join(__dirname, 'storage', 'data.json');
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

// ==== Helper Functions ====
function readData() {
    return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
}

function writeData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// ==== API Routes ====

// --- Health Check ---
app.get('/health', (req, res) => {
    res.json({ status: "Mix Platform Alive" });
});

// --- Social Feed ---
app.get('/api/social', (req, res) => {
    const data = readData();
    res.json(data.social);
});
app.post('/api/social', (req, res) => {
    const data = readData();
    const newPost = { id: data.social.length + 1, ...req.body };
    data.social.push(newPost);
    writeData(data);
    res.status(201).json(newPost);
});

// --- Store Items ---
app.get('/api/store', (req, res) => {
    const data = readData();
    res.json(data.store);
});
app.post('/api/store', (req, res) => {
    const data = readData();
    const newItem = { id: data.store.length + 1, ...req.body };
    data.store.push(newItem);
    writeData(data);
    res.status(201).json(newItem);
});

// --- Wallet Management ---
app.get('/api/wallet', (req, res) => {
    const data = readData();
    res.json(data.wallet);
});
app.post('/api/wallet', (req, res) => {
    const data = readData();
    const newTransaction = { id: data.wallet.length + 1, ...req.body };
    data.wallet.push(newTransaction);
    writeData(data);
    res.status(201).json(newTransaction);
});

// --- Games ====
app.get('/api/games', (req, res) => {
    const data = readData();
    res.json(data.games);
});
app.post('/api/games', (req, res) => {
    const data = readData();
    const newGame = { id: data.games.length + 1, ...req.body };
    data.games.push(newGame);
    writeData(data);
    res.status(201).json(newGame);
});

// --- Metaverse ====
app.get('/api/metaverse', (req, res) => {
    const data = readData();
    res.json(data.metaverse);
});
app.post('/api/metaverse', (req, res) => {
    const data = readData();
    const newWorld = { id: data.metaverse.length + 1, ...req.body };
    data.metaverse.push(newWorld);
    writeData(data);
    res.status(201).json(newWorld);
});

// --- Matrix Chat ====
app.get('/api/matrix', (req, res) => {
    const data = readData();
    res.json(data.matrix);
});
app.post('/api/matrix', (req, res) => {
    const data = readData();
    const newMessage = { id: data.matrix.length + 1, ...req.body };
    data.matrix.push(newMessage);
    writeData(data);
    res.status(201).json(newMessage);
});

// ==== Start Server ====
app.listen(PORT, () => {
    console.log(` Mix Platform backend is running on port ${PORT}`);
});
