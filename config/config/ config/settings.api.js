// config/settings.api.js

/**
 * Mix Platform - Settings API Manager
 * إدارة جميع إعدادات المنصة (Frontend ↔ Backend ↔ Config)
 */

const BASE_URL = "/api/settings";

// ===== Endpoints =====
const settingsAPI = {
  getAll: `${BASE_URL}`,                 // GET جميع الإعدادات
  updateAll: `${BASE_URL}`,              // POST تحديث الكل

  general: `${BASE_URL}/general`,
  games: `${BASE_URL}/games`,
  social: `${BASE_URL}/social`,
  gps: `${BASE_URL}/gps`,
  matrix: `${BASE_URL}/matrix`,
  wallet: `${BASE_URL}/wallet`
};

// ===== إعدادات الطلب =====
const defaultOptions = {
  headers: {
    "Content-Type": "application/json"
  }
};

// ===== جلب كل الإعدادات =====
export async function getAllSettings() {
  const res = await fetch(settingsAPI.getAll, {
    method: "GET",
    ...defaultOptions
  });
  return await res.json();
}

// ===== تحديث كل الإعدادات =====
export async function updateAllSettings(data) {
  const res = await fetch(settingsAPI.updateAll, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify(data)
  });
  return await res.json();
}

// ===== إعدادات عامة =====
export async function getGeneralSettings() {
  const res = await fetch(settingsAPI.general);
  return await res.json();
}

export async function updateGeneralSettings(data) {
  const res = await fetch(settingsAPI.general, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify(data)
  });
  return await res.json();
}

// ===== إعدادات الألعاب =====
export async function getGamesSettings() {
  const res = await fetch(settingsAPI.games);
  return await res.json();
}

export async function updateGamesSettings(data) {
  const res = await fetch(settingsAPI.games, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify(data)
  });
  return await res.json();
}

// ===== إعدادات التواصل =====
export async function getSocialSettings() {
  const res = await fetch(settingsAPI.social);
  return await res.json();
}

export async function updateSocialSettings(data) {
  const res = await fetch(settingsAPI.social, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify(data)
  });
  return await res.json();
}

// ===== إعدادات GPS =====
export async function getGPSSettings() {
  const res = await fetch(settingsAPI.gps);
  return await res.json();
}

export async function updateGPSSettings(data) {
  const res = await fetch(settingsAPI.gps, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify(data)
  });
  return await res.json();
}

// ===== إعدادات Matrix =====
export async function getMatrixSettings() {
  const res = await fetch(settingsAPI.matrix);
  return await res.json();
}

export async function updateMatrixSettings(data) {
  const res = await fetch(settingsAPI.matrix, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify(data)
  });
  return await res.json();
}

// ===== إعدادات Wallet =====
export async function getWalletSettings() {
  const res = await fetch(settingsAPI.wallet);
  return await res.json();
}

export async function updateWalletSettings(data) {
  const res = await fetch(settingsAPI.wallet, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify(data)
  });
  return await res.json();
}

// ===== أدوات مساعدة =====

// حفظ محلي (LocalStorage)
export function saveLocalSettings(data) {
  localStorage.setItem("mix_settings", JSON.stringify(data));
}

// تحميل محلي
export function loadLocalSettings() {
  const data = localStorage.getItem("mix_settings");
  return data ? JSON.parse(data) : null;
}

