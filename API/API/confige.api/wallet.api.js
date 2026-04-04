// API/config.api/wallet.api.js

const WALLET_API_BASE = "https://http://localhost:3000/api/wallet";

/**
 * تنفيذ طلب API لمحفظة Mix Platform
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

/*---وظائف رئيسية---*/

/**
 * جلب الرصيد العام للمحفظة
 * @returns {Promise<number>} الرصيد
 */
export async function getWalletBalance() {
  const data = await walletApiFetch("balance");
  return data ? data.balance : 0;
}

/**
 * إرسال عملة داخل المنصة
 * @param {string} recipient - معرف المستلم
 * @param {number} amount - المبلغ المرسل
 * @returns {Promise<object>} نتيجة الإرسال
 */
export async function sendWalletCurrency(recipient, amount) {
  if (!recipient || !amount) throw new Error("Recipient and amount required");
  return await walletApiFetch("send", {
    method: "POST",
    body: JSON.stringify({ recipient, amount }),
  });
}

/**
 * جلب سجل معاملات المحفظة
 * @returns {Promise<Array>} قائمة المعاملات
 */
export async function getWalletHistory() {
  const data = await walletApiFetch("history");
  return data || [];
}

/**
 * استقبال عملة أو تفعيل رصيد داخلي
 * @param {number} amount - المبلغ المراد إضافته
 * @returns {Promise<object>} نتيجة التحديث
 */
export async function receiveWalletCurrency(amount) {
  if (!amount) throw new Error("Amount required");
  return await walletApiFetch("receive", {
    method: "POST",
    body: JSON.stringify({ amount }),
  });
}
