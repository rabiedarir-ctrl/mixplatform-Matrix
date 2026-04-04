'use strict';

// Dependencies 
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const rateLimit = require("express-rate-limit");

// Setting selector
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100, // 100 طلب لكل IP
  message: "Too many requests, please try again later."
});

  app.use(limiter);

const routes = require('./routes'); // ملف routes.js
app.use('/api', routes);

//  Constants & Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(cors({ origin: 'true' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Storage 
const storageDir = path.join(__dirname, '../storage');
const dataPath = path.join(storageDir, 'data.json');
if (!fs.existsSync(storageDir)) fs.mkdirSync(storageDir);
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

// Helper Functions
function readData() {
    try {
        return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    } catch (error) {
        console.error("Read Error:", error);
        return { social: [], store: [], wallet: [], games: [], metaverse: [], matrix: [] };
    }
}

function writeData(data) {
    try { fs.writeFileSync(dataPath, JSON.stringify(data, null, 2)); }
    catch (error) { console.error("Write Error:", error); }
}

function generateId() { return Date.now(); }

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

// Routes (Legacy CRUD) 
const keys = ['social', 'store', 'wallet', 'games', 'metaverse', 'matrix'];
keys.forEach(key => {
    app.get(`/api/${key}`, createGetHandler(key));
    app.post(`/api/${key}`, createPostHandler(key));
});

// Modules APIs 

// GPS Module
import gpsManager from "./modules/gps/gps_manager.js";
app.get("/api/gps/location", gpsManager.getLocation);
app.post("/api/gps/geofence", gpsManager.setGeofence);

// Wallet Module
import walletManager from "./modules/wallet/wallet_manager.js";
app.get("/api/wallet/balance", walletManager.getBalance);
app.post("/api/wallet/transaction", walletManager.createTransaction);

// AI Module
import aiCore from "./modules/ai/ai_core.js";
app.post("/api/ai/analyze", aiCore.analyzeData);

// Matrix Module
import { sendMessage, getMessages } from "./modules/matrix/matrixClient.js";
app.get("/api/matrix/messages", getMessages);
app.post("/api/matrix/send", sendMessage);

// Upload API
var express = require('express');
var app = express();

// set up rate limiter: maximum of five requests per minute
var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

app.get('/:path', function(req, res) {
  let path = req.params.path;
  if (isValidPath(path))
    res.sendFile("../frontend/index.html");
})

// Health 
app.get("/health", (req, res) => {
    res.json({
        status: "Mix Platform Alive",
        serverTime: new Date().toISOString(),
        modules: ["GPS", "Wallet", "AI", "Matrix"]
    });
});

//  Static Frontend 
app.use("/static", express.static(path.join(__dirname, "../frontend/static")));
app.use("/frontend", express.static(path.join(__dirname, "../frontend")));

// Fallback 
var express = require('express');
var app = express();

// set up rate limiter: maximum of five requests per minute
var RateLimit = require('express-rate-limit');
var limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

app.get('/:path', function(req, res) {
  let path = req.params.path;
  if (isValidPath(path))
    res.sendFile(_dirname, "../frontend/index.html");
});

// Error Handling 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start Server 
app.listen(PORT, () => {
    console.log(`🚀 Mix Platform API & Server running at http://localhost:${PORT}`);
});

