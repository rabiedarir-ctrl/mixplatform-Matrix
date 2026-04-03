'use strict';

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const storageDir = path.join(__dirname, '../storage');
const dataPath = path.join(storageDir, 'data.json');

// Ensure storage exists
if (!fs.existsSync(storageDir)) fs.mkdirSync(storageDir);
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify({
    social: [],
    store: [],
    wallet: [],
    games: [],
    metaverse: [],
    matrix: [],
    gps: []
  }, null, 2));
}

// Helpers
function readData() {
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  } catch (err) {
    console.error("Read Error:", err);
    return { social: [], store: [], wallet: [], games: [], metaverse: [], matrix: [], gps: [] };
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Write Error:", err);
  }
}

function generateId() { return Date.now(); }

// Generic Get / Post Handlers
function createGetHandler(key) {
  return (req, res) => {
    const data = readData();
    res.json(data[key]);
  };
}

function createPostHandler(key) {
  return (req, res) => {
    const data = readData();
    const newItem = { id: generateId(), ...req.body };
    data[key].push(newItem);
    writeData(data);
    res.status(201).json(newItem);
  };
}

// Routes

// Health Check
router.get('/health', (req, res) => {
  res.json({ status: "Mix Platform Alive" });
});

// Social
router.get('/social', createGetHandler('social'));
router.post('/social', createPostHandler('social'));

// Store
router.get('/store', createGetHandler('store'));
router.post('/store', createPostHandler('store'));

// Wallet
router.get('/wallet', createGetHandler('wallet'));
router.post('/wallet', createPostHandler('wallet'));

// Games
router.get('/games', createGetHandler('games'));
router.post('/games', createPostHandler('games'));

// Metaverse
router.get('/metaverse', createGetHandler('metaverse'));
router.post('/metaverse', createPostHandler('metaverse'));

// Matrix (Chat)
router.get('/matrix', createGetHandler('matrix'));
router.post('/matrix', createPostHandler('matrix'));

// GPS
router.get('/gps', createGetHandler('gps'));
router.post('/gps', createPostHandler('gps'));

module.exports = router;

// limiter

var  express  =  require ( 'express' ) ; 
var  app  =  express ( ) ;

// إعداد مُحدد معدل الطلبات: بحد أقصى خمسة طلبات في الدقيقة 
var  RateLimit  =  require ( 'express-rate-limit' ) ; 
var  limiter  =  RateLimit ( { 
  windowMs : 15  *  60  *  1000 ,  // 15 دقيقة 
  max : 100 ,  // بحد أقصى 100 طلب لكل windowMs 
} ) ;


// تطبيق محدد معدل الطلبات على جميع الطلبات app.use ( limiter ) ;
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
    res.sendFile(path);
