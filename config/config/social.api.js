// config/social.api.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// 🗂 تخزين مؤقت للصور
const upload = multer({ dest: path.join(__dirname, '../../storage/cache') });

// 👤 بيانات المستخدمين (تجريبية)
let users = [
    { id: 1, name: 'Ali', avatar: '/static/avatars/ali.png' },
    { id: 2, name: 'Sara', avatar: '/static/avatars/sara.png' },
    { id: 3, name: 'Omar', avatar: '/static/avatars/omar.png' },
];

// 💬 بيانات التعليقات (تجريبية)
let comments = [
    { id: 1, user: 'Ali', text: 'مرحبا! هذا أول تعليق.' },
    { id: 2, user: 'Sara', text: 'منصة رائعة!' },
];

// ===== جلب المستخدمين =====
router.get('/users', (req, res) => {
    res.json(users);
});

// ===== جلب التعليقات =====
router.get('/comments', (req, res) => {
    res.json(comments);
});

// ===== رفع الصور =====
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'لم يتم اختيار ملف' });
    res.json({ message: 'تم رفع الصورة بنجاح', file: req.file.filename });
});

// ===== بث مباشر =====
// هذا مجرد رابط تجريبي للـ Frontend
router.get('/live-stream', (req, res) => {
    res.json({ url: '/static/videos/sample.mp4' });
});

// ===== دمج AI (Mock) =====
router.post('/ai', express.json(), (req, res) => {
    const { question } = req.body;
    // رد تجريبي
    const answer = `رد AI على السؤال: "${question}"`;
    res.json({ answer });
});

module.exports = router;
