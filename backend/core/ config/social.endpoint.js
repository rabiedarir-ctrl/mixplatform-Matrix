// config/social.endpoint.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ===== إعداد رفع الملفات =====
const uploadDir = path.join(__dirname, '../../storage/cache');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({ dest: uploadDir });

// ===== بيانات المستخدمين (تجريبية) =====
let users = [
    { id: 1, name: 'Ali', avatar: '/static/avatars/ali.png' },
    { id: 2, name: 'Sara', avatar: '/static/avatars/sara.png' },
    { id: 3, name: 'Omar', avatar: '/static/avatars/omar.png' },
];

// ===== بيانات التعليقات (تجريبية) =====
let comments = [
    { id: 1, user: 'Ali', text: 'مرحبا! هذا أول تعليق.' },
    { id: 2, user: 'Sara', text: 'منصة رائعة!' },
];

// ===== GET: جلب جميع المستخدمين =====
router.get('/users', (req, res) => {
    res.json(users);
});

// ===== GET: جلب جميع التعليقات =====
router.get('/comments', (req, res) => {
    res.json(comments);
});

// ===== POST: إضافة تعليق =====
router.post('/comments', express.json(), (req, res) => {
    const { user, text } = req.body;
    if (!user || !text) return res.status(400).json({ error: 'مطلوب المستخدم والنص' });
    const newComment = { id: comments.length + 1, user, text };
    comments.push(newComment);
    res.json(newComment);
});

// ===== POST: رفع صورة =====
router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'لم يتم اختيار ملف' });
    const fileUrl = `/static/cache/${req.file.filename}`;
    res.json({ message: 'تم رفع الصورة بنجاح', file: fileUrl });
});

// ===== GET: بث مباشر (رابط تجريبي) =====
router.get('/live-stream', (req, res) => {
    res.json({ url: '/static/videos/sample.mp4' });
});

// ===== POST: دمج AI (Mock) =====
router.post('/ai', express.json(), (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'مطلوب السؤال' });
    // رد تجريبي
    const answer = `رد AI على السؤال: "${question}"`;
    res.json({ answer });
});

module.exports = router;


