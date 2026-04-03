// config/bitcoin.endpoints.js

const BITCOIN_API_BASE = "http://localhost:3000/endpoint/bitcoin";

/**
 * نقاط النهاية الخاصة بالبيتكوين في Mix Platform
 */
export const BitcoinEndpoints = {
  /**
   * جلب رصيد البيتكوين
   * GET /bitcoin/balance
   * @returns {Promise<{balance: number}>}
   */
  getBalance: async () => {
    try {
      const res = await fetch(`${BITCOIN_API_BASE}/balance`, {
        headers: { "Content-Type": "application/json" }
      });
      if (!res.ok) throw new Error("خطأ في تحميل الرصيد");
      return await res.json();
    } catch (err) {
      console.error("Bitcoin getBalance Error:", err);
      return { balance: 0 };
    }
  },

  /**
   * إرسال بيتكوين لمستلم محدد
   * POST /bitcoin/send
   * body: { recipient, amount }
   * @param {string} recipient
   * @param {number} amount
   * @returns {Promise<{message: string}>}
   */
  send: async (recipient, amount) => {
    try {
      const res = await fetch(`${BITCOIN_API_BASE}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient, amount })
      });
      if (!res.ok) throw new Error("خطأ في إرسال البيتكوين");
      return await res.json();
    } catch (err) {
      console.error("Bitcoin send Error:", err);
      return { message: "فشل الإرسال" };
    }
  },

  /**
   * جلب سجل المعاملات
   * GET /bitcoin/history
   * @returns {Promise<Array>}
   */
  getHistory: async () => {
    try {
      const res = await fetch(`${BITCOIN_API_BASE}/history`, {
        headers: { "Content-Type": "application/json" }
      });
      if (!res.ok) throw new Error("خطأ في تحميل السجل");
      return await res.json();
    } catch (err) {
      console.error("Bitcoin getHistory Error:", err);
      return [];
    }
  }
};
