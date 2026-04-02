// config/settings.endpoint.js

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// 📂 مسار ملف الإعدادات
const configPath = path.join(__dirname, "../../mix.config.json");

// ===== تحميل الإعدادات =====
function loadSettings() {
  try {
    const data = fs.readFileSync(configPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error loading config:", err);

    // إعدادات افتراضية
    return {
      general: { username: "Guest", darkMode: false },
      games: { sound: true, saveScore: true },
      social: { visibility: "public" },
      gps: { enabled: false },
      matrix: { autoSave: true },
      wallet: { currency: "BTC" }
    };
  }
}

// ===== حفظ الإعدادات =====
function saveSettings(data) {
  fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
}

// ===== GET: كل الإعدادات =====
router.get("/", (req, res) => {
  const settings = loadSettings();
  res.json(settings);
});

// ===== POST: تحديث كل الإعدادات =====
router.post("/", express.json(), (req, res) => {
  const newSettings = req.body;
  saveSettings(newSettings);
  res.json({ message: "تم تحديث جميع الإعدادات", data: newSettings });
});

// ===== GET / POST لكل قسم =====

// ⚙️ عام
router.get("/general", (req, res) => {
  const settings = loadSettings();
  res.json(settings.general);
});

router.post("/general", express.json(), (req, res) => {
  const settings = loadSettings();
  settings.general = req.body;
  saveSettings(settings);
  res.json({ message: "تم تحديث الإعدادات العامة" });
});

// 🎮 الألعاب
router.get("/games", (req, res) => {
  const settings = loadSettings();
  res.json(settings.games);
});

router.post("/games", express.json(), (req, res) => {
  const settings = loadSettings();
  settings.games = req.body;
  saveSettings(settings);
  res.json({ message: "تم تحديث إعدادات الألعاب" });
});

// 💬 التواصل
router.get("/social", (req, res) => {
  const settings = loadSettings();
  res.json(settings.social);
});

router.post("/social", express.json(), (req, res) => {
  const settings = loadSettings();
  settings.social = req.body;
  saveSettings(settings);
  res.json({ message: "تم تحديث إعدادات التواصل" });
});

// 📡 GPS
router.get("/gps", (req, res) => {
  const settings = loadSettings();
  res.json(settings.gps);
});

router.post("/gps", express.json(), (req, res) => {
  const settings = loadSettings();
  settings.gps = req.body;
  saveSettings(settings);
  res.json({ message: "تم تحديث إعدادات GPS" });
});

// 🧠 Matrix
router.get("/matrix", (req, res) => {
  const settings = loadSettings();
  res.json(settings.matrix);
});

router.post("/matrix", express.json(), (req, res) => {
  const settings = loadSettings();
  settings.matrix = req.body;
  saveSettings(settings);
  res.json({ message: "تم تحديث إعدادات Matrix" });
});

// 💰 Wallet
router.get("/wallet", (req, res) => {
  const settings = loadSettings();
  res.json(settings.wallet);
});

router.post("/wallet", express.json(), (req, res) => {
  const settings = loadSettings();
  settings.wallet = req.body;
  saveSettings(settings);
  res.json({ message: "تم تحديث إعدادات Wallet" });
});

module.exports = router;
