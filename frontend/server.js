const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

// تحديد مجلد الواجهة
const frontendPath = path.join(__dirname);

// ملفات ثابتة (HTML, CSS, JS)
app.use(express.static(frontendPath));

// SPA fallback (أي رابط يرجع index.html)
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
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`🚀 Frontend running on http://localhost:${PORT}`);
});
