// API/config.api/dashboard.api.js

const API_BASE = "http://localhost:3000/api/dashboard"; // غيّر الرابط حسب إعداداتك

/**
 * دالة fetch عامة للتواصل مع API
 * @param {string} endpoint
 * @param {object} options
 * @returns {Promise<any>}
 */
export async function apiFetch(endpoint, options = {}) {
  try {
    const url = `${API_BASE}/${endpoint}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error(" API Fetch Error:", err);
    return null;
  }
}

/**
 * جلب إحصائيات عامة للـ Dashboard
 */
export async function getStats() {
  return await apiFetch("dashboard/stats");
}

/**
 * جلب قائمة المستخدمين
 */
export async function getUsers() {
  return await apiFetch("dashboard/users");
}

/**
 * جلب سجل المعاملات
 */
export async function getTransactions() {
  return await apiFetch("dashboard/transactions");
}

/**
 * إرسال بيتكوين أو أي عملة أخرى
 * @param {string} type - نوع العملية
 * @param {object} data - بيانات العملية
 */
export async function sendTransaction(type, data) {
  return await apiFetch(`dashboard/${type}/send`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * جلب سجل البيتكوين
 */
export async function getBitcoinHistory() {
  return await apiFetch("dashboard/bitcoin/history");
}

/**
 * جلب رصيد البيتكوين
 */
export async function getBitcoinBalance() {
  return await apiFetch("dashboard/bitcoin/balance");
}
