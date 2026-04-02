// config/home.api.js

const HOME_API_BASE = "http://localhost:3000/api/home";

/**
 * تنفيذ طلب API للصفحة الرئيسية
 * @param {string} endpoint - مسار API بعد /home
 * @param {object} options - إعدادات fetch (GET, POST, body, headers)
 * @returns {Promise<object>}
 */
export async function homeApiFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${HOME_API_BASE}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`خطأ في الاتصال بـ Home API: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Home API Error:", err);
    return null;
  }
}

/*---وظائف رئيسية---*/

/**
 * جلب محتوى الصفحة الرئيسية
 * @returns {Promise<object>} بيانات الصفحة الرئيسية
 */
export async function getHomeContent() {
  return await homeApiFetch("content") || {};
}

/**
 * جلب آخر الوسائط (Media)
 * @returns {Promise<Array>} قائمة الوسائط
 */
export async function getHomeMedia() {
  return await homeApiFetch("media") || [];
}

/**
 * جلب إحصائيات عامة للصفحة الرئيسية
 * @returns {Promise<object>} إحصائيات المستخدمين والأنشطة
 */
export async function getHomeStats() {
  return await homeApiFetch("stats") || { users: 0, transactions: 0, media: 0 };
}
