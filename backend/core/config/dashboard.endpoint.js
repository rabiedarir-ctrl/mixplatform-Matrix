// config/dashboard.endpoint.js

const DASHBOARD_API_BASE = "http://localhost:3000/endpoint/dashboard";

/**
 * تنفيذ طلب API للـ Dashboard
 * @param {string} endpoint - مسار API بعد /dashboard
 * @param {object} options - إعدادات fetch (GET, POST, body, headers)
 * @returns {Promise<object>}
 */
export async function dashboardApiFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${DASHBOARD_API_BASE}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`خطأ في الاتصال بـ Dashboard API: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Dashboard API Error:", err);
    return null;
  }
}

/* ---وظائف رئيسية للـ Dashboard---*/

/**
 * جلب الإحصائيات العامة للمنصة
 * @returns {Promise<object>} { users, transactions, media, wallets }
 */
export async function getDashboardStats() {
  return await dashboardApiFetch("stats");
}

/**
 * جلب قائمة المستخدمين
 * @returns {Promise<Array>} [{ name, email, date }]
 */
export async function getDashboardUsers() {
  return await dashboardApiFetch("users");
}

/**
 * جلب سجل المعاملات
 * @returns {Promise<Array>} [{ type, amount, date, user }]
 */
export async function getDashboardTransactions() {
  return await dashboardApiFetch("transactions");
}

/**
 * جلب قائمة الوسائط (Media)
 * @returns {Promise<Array>} [{ id, title, type, date }]
 */
export async function getDashboardMedia() {
  return await dashboardApiFetch("media");
}

/**
 * جلب قائمة المحافظ الرقمية (Wallets)
 * @returns {Promise<Array>} [{ user, balance, currency }]
 */
export async function getDashboardWallets() {
  return await dashboardApiFetch("wallets");
}
