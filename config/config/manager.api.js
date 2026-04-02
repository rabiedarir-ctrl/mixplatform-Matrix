// config/manager.api.js

const MANAGER_API_BASE = "http://localhost:3000/api/manager";

/**
 * تنفيذ طلب API لمدير الأعمال
 * @param {string} endpoint - مسار API بعد /manager
 * @param {object} options - إعدادات fetch (GET, POST, body, headers)
 * @returns {Promise<object>}
 */
export async function managerApiFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${MANAGER_API_BASE}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`خطأ في الاتصال بـ Manager API: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Manager API Error:", err);
    return null;
  }
}

/*---وظائف رئيسية---*/

/**
 * جلب الإحصائيات العامة
 * @returns {Promise<object>} { users, transactions, media }
 */
export async function getManagerStats() {
  return await managerApiFetch("stats");
}

/**
 * جلب قائمة المستخدمين
 * @returns {Promise<Array>} [{ name, email, date }]
 */
export async function getUsers() {
  return await managerApiFetch("users");
}

/**
 * جلب سجل المعاملات
 * @returns {Promise<Array>} [{ type, amount, date, user }]
 */
export async function getTransactions() {
  return await managerApiFetch("transactions");
}

/**
 * إضافة مستخدم جديد
 * @param {object} userData { name, email, password }
 * @returns {Promise<object>} نتيجة الإضافة
 */
export async function addUser(userData) {
  return await managerApiFetch("users/add", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

/**
 * حذف مستخدم
 * @param {string} userId - معرف المستخدم
 * @returns {Promise<object>} نتيجة الحذف
 */
export async function deleteUser(userId) {
  return await managerApiFetch(`users/delete/${userId}`, {
    method: "DELETE",
  });
}
