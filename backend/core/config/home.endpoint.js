// config/home.endpoint.js

const HOME_API_BASE = "https://rabiedarir-ctrl.github.io/mixplatform-Matrix/home";

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

/*---الوظائف الأساسية للصفحة الرئيسية---*/

/**
 * جلب الأخبار / الميديا الرئيسية
 * @returns {Promise<Array>} قائمة الأخبار أو الميديا
 */
export async function getHomeMedia() {
  const data = await homeApiFetch("media");
  return data || [];
}

/**
 * جلب بيانات المتافيرس
 * @returns {Promise<Array>} قائمة العناصر المتافيرس
 */
export async function getHomeMetaverse() {
  const data = await homeApiFetch("metaverse");
  return data || [];
}

/**
 * جلب ملخص المحفظة (Wallet Summary)
 * @returns {Promise<object>} بيانات المحفظة
 */
export async function getHomeWalletSummary() {
  const data = await homeApiFetch("wallet");
  return data || { balance: 0, btc: 0 };
}

/**
 * جلب آخر المستخدمين أو الأنشطة العامة
 * @returns {Promise<Array>} قائمة المستخدمين أو الأنشطة
 */
export async function getHomeUsersActivity() {
  const data = await homeApiFetch("users");
  return data || [];
}
