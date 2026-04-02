// config/games.api.js

/**
 * Mix Platform - Games API Configuration
 * هذا الملف يُستخدم لإدارة جميع endpoints الخاصة بالألعاب
 * بما فيها لعبة Bitcoin وأي ألعاب مستقبلية
 */

const BASE_API_URL = "/api/games"; // المسار الأساسي للـ Backend

// ===== تعريف endpoints للألعاب =====
const gamesAPI = {
    listGames: `${BASE_API_URL}`,                   // GET: قائمة الألعاب
    bitcoin: {
        play: `${BASE_API_URL}/bitcoin`,            // POST: إرسال نتائج لعبة Bitcoin
        leaderboard: `${BASE_API_URL}/bitcoin/leaderboard` // GET: لوحة المتصدرين (يمكن الإضافة لاحقاً)
    },
    futureGames: `${BASE_API_URL}/future`           // GET/POST للألعاب المستقبلية
};

// ===== خيارات إضافية =====
const apiOptions = {
    timeout: 5000, // مدة الانتظار قبل انتهاء الطلب (مللي ثانية)
    headers: {
        "Content-Type": "application/json"
    }
};

// ===== دوال مساعدة للاتصال بالـ API =====
async function getGames() {
    const res = await fetch(gamesAPI.listGames, { method: 'GET', ...apiOptions });
    return await res.json();
}

async function postBitcoinResult(user, score) {
    const res = await fetch(gamesAPI.bitcoin.play, {
        method: 'POST',
        ...apiOptions,
        body: JSON.stringify({ user, score })
    });
    return await res.json();
}

async function getBitcoinLeaderboard() {
    const res = await fetch(gamesAPI.bitcoin.leaderboard, { method: 'GET', ...apiOptions });
    return await res.json();
}

export { gamesAPI, getGames, postBitcoinResult, getBitcoinLeaderboard };
