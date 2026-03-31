// config/manager.endpoint.js

const MANAGER_API_BASE = "https://rabiedarir-ctrl.github.io/mixplatform-Matrix/manager";

/**
 * تنفيذ طلب API للـ Manager
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

/* ---وظائف رئيسية للـ Manager---*/

/**
 * جلب إحصائيات عامة
 * @returns {Promise<object>} { users, transactions, media }
 */
export async function getStats() {
  return await managerApiFetch("stats");
}

/**
 * جلب قائمة المستخدمين
 * @returns {Promise<Array>} قائمة المستخدمين
 */
export async function getUsers() {
  const data = await managerApiFetch("users");
  return data || [];
}

/**
 * إضافة مستخدم جديد
 * @param {object} user { name, email, role }
 * @returns {Promise<object>}
 */
export async function addUser(user) {
  return await managerApiFetch("users/add", {
    method: "POST",
    body: JSON.stringify(user),
  });
}

/**
 * حذف مستخدم
 * @param {string} userId
 * @returns {Promise<object>}
 */
export async function deleteUser(userId) {
  return await managerApiFetch(`users/delete/${userId}`, {
    method: "DELETE",
  });
}

/**
 * جلب سجل المعاملات
 * @returns {Promise<Array>}
 */
export async function getTransactions() {
  const data = await managerApiFetch("transactions");
  return data || [];
}

/**
 * إضافة معاملة جديدة
 * @param {object} tx { user, type, amount }
 * @returns {Promise<object>}
 */
export async function addTransaction(tx) {
  return await managerApiFetch("transactions/add", {
    method: "POST",
    body: JSON.stringify(tx),
  });
}
