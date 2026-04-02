// config/games.api.js

const express = require('express');
const router = express.Router();

// 🕹 بيانات الألعاب (تجريبية)
let games = [
    { id: 1, name: 'Bitcoin Game', description: 'احصل على أكبر عدد من العملات الافتراضية' },
    { id: 2, name: 'Puzzle', description: 'حل الألغاز والأحاجي' },
    { id: 3, name: 'Memory', description: 'تحدي الذاكرة' }
];

// 🎮 نتائج الألعاب (تجريبية)
let gameResults = [];

// ===== GET: قائمة الألعاب =====
router.get('/games', (req, res) => {
    res.json(games);
});

// ===== POST: حفظ نتيجة لعبة Bitcoin =====
router.post('/games/bitcoin', express.json(), (req, res) => {
    const { user, score } = req.body;
    if (!user || score === undefined) return res.status(400).json({ error: 'مطلوب المستخدم والنقاط' });

    const record = { id: gameResults.length + 1, game: 'Bitcoin', user, score, date: new Date() };
    gameResults.push(record);

    res.json({ message: `تم تسجيل ${score} نقطة للمستخدم ${user}`, record });
});

// ===== GET: نتائج كل الألعاب =====
router.get('/games/results', (req, res) => {
    res.json(gameResults);
});

// ===== POST: حفظ نتيجة أي لعبة =====
router.post('/games/result', express.json(), (req, res) => {
    const { game, user, score } = req.body;
    if (!game || !user || score === undefined) return res.status(400).json({ error: 'مطلوب اسم اللعبة، المستخدم والنقاط' });

    const record = { id: gameResults.length + 1, game, user, score, date: new Date() };
    gameResults.push(record);

    res.json({ message: `تم تسجيل النتيجة للعبة ${game}`, record });
});

module.exports = router;
