// config/bitcoin.api.js

const BITCOIN_API_BASE = "http://localhost:3000";

/**
 * تنفيذ طلب API للبيتكوين
 * @param {string} endpoint - مسار API بعد /bitcoin
 * @param {object} options - إعدادات fetch (GET, POST, body, headers)
 * @returns {Promise<object>}
 */
export async function bitcoinApiFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${BITCOIN_API_BASE}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`خطأ في الاتصال بـ Bitcoin API: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Bitcoin API Error:", err);
    return null;
  }
}

/*---وظائف رئيسية---*/

/**
 * جلب الرصيد الحالي للبيتكوين
 * @returns {Promise<number>} الرصيد
 */
export async function getBitcoinBalance() {
  const data = await bitcoinApiFetch("balance");
  return data ? data.balance : 0;
}

/**
 * إرسال بيتكوين لمستخدم آخر
 * @param {string} recipient - عنوان المستلم
 * @param {number} amount - المبلغ المرسل بالـ BTC
 * @returns {Promise<object>} نتيجة الإرسال
 */
export async function sendBitcoin(recipient, amount) {
  if (!recipient || !amount) throw new Error("Recipient and amount required");
  return await bitcoinApiFetch("send", {
    method: "POST",
    body: JSON.stringify({ recipient, amount }),
  });
}

/**
 * جلب سجل المعاملات
 * @returns {Promise<Array>} قائمة المعاملات
 */
export async function getBitcoinHistory() {
  const data = await bitcoinApiFetch("history");
  return data || [];
  }
 mixplatform-Matrix/config/bitcoin.api.js at main · rabiedarir-ctrl/mixplatform-Matrix
