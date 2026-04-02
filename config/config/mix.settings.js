// config/mix.settings.js


const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "./pages//mix.settings.css";
document.head.appendChild(link);

import { apiFetch } from "../config/api.js";

/**
 * Mix Platform - Global Settings
 * ملف إعدادات موحد لجميع صفحات وموديولات المنصة
 */

// ===== إعدادات عامة للمنصة =====
const globalSettings = {
    platformName: "Mix Platform",
    version: "1.0.0",
    language: "ar",
    theme: {
        primaryColor: "#007bff",
        secondaryColor: "#28a745",
        backgroundColor: "#f9f9f9",
        textColor: "#222"
    },
    apiBase: "/api", // المسار الأساسي للـ Backend
    timeout: 5000 // مدة الانتظار للطلبات
};

// ===== إعدادات الصفحة الاجتماعية =====
const socialSettings = {
    enableComments: true,
    enableLiveStream: true,
    enableImageUpload: true,
    aiIntegration: true,
    defaultFeedLimit: 10
};

// ===== إعدادات الألعاب =====
const gamesSettings = {
    enableGames: true,
    defaultGame: "bitcoin",
    bitcoinGame: {
        canvasWidth: 400,
        canvasHeight: 300,
        spawnRate: 0.05, // احتمال ظهور العملات
        playerSpeed: 10
    },
    leaderboardEnabled: true
};

// ===== إعدادات المحفظة =====
const walletSettings = {
    currency: "BTC",
    showBalance: true,
    enableTransactions: true,
    defaultDeposit: 0.001
};

// ===== إعدادات Metaverse =====
const metaverseSettings = {
    enableMetaverse: true,
    worldWidth: 800,
    worldHeight: 600,
    defaultAvatar: "/static/avatars/default.png"
};

// ===== إعدادات Matrix (الدردشة) =====
const matrixSettings = {
    enableChat: true,
    maxMessageLength: 500,
    showTimestamps: true,
    defaultRoom: "general"
};

// ===== إعدادات Dashboard =====
const dashboardSettings = {
    showWidgets: true,
    defaultWidgets: ["social", "games", "wallet", "metaverse", "matrix"],
    refreshInterval: 30000 // تحديث تلقائي لكل 30 ثانية
};

// ===== دمج جميع الإعدادات في كائن واحد =====
const MixSettings = {
    global: globalSettings,
    social: socialSettings,
    games: gamesSettings,
    wallet: walletSettings,
    metaverse: metaverseSettings,
    matrix: matrixSettings,
    dashboard: dashboardSettings
};

// ===== تصدير الإعدادات =====
export default MixSettings;
