// config/Wallet.endpoint.js

const WALLET_API_BASE = "http://localhost:3000/endpoint/Wallet";

/**
 * تنفيذ طلب API للمحفظة
 * @param {string} endpoint - مسار API بعد /wallet
 * @param {object} options - إعدادات fetch (GET, POST, body, headers)
 * @returns {Promise<object>}
 */
export async function walletApiFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${WALLET_API_BASE}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`خطأ في الاتصال بـ Wallet API: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Wallet API Error:", err);
    return null;
  }
}

/* ---وظائف رئيسية---*/

/**
 * جلب رصيد المستخدم
 * @param {string} userId - معرف المستخدم
 * @returns {Promise<number>} الرصيد
 */
export async function getWalletBalance(userId) {
  const data = await walletApiFetch(`balance/${userId}`);
  return data ? data.balance : 0;
}

/**
 * إرسال مبلغ من المحفظة لمستخدم آخر
 * @param {string} userId - معرف المرسل
 * @param {string} recipient - معرف المستلم
 * @param {number} amount - المبلغ
 * @returns {Promise<object>} نتيجة العملية
 */
export async function sendWalletAmount(userId, recipient, amount) {
  if (!userId || !recipient || !amount) throw new Error("جميع الحقول مطلوبة");
  return await walletApiFetch("send", {
    method: "POST",
    body: JSON.stringify({ userId, recipient, amount }),
  });
}

/**
 * جلب سجل المعاملات
 * @param {string} userId - معرف المستخدم
 * @returns {Promise<Array>} قائمة المعاملات
 */
export async function getWalletHistory(userId) {
  const data = await walletApiFetch(`history/${userId}`);
  return data || [];
}
