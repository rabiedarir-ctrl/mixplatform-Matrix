// pages/bitcoin.js

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "./pages/bitcoin.css";
document.head.appendChild(link);

import { apiFetch } from "../config/api.js";

export function loadBitcoin(app) {
  const container = document.createElement("div");
  container.className = "bitcoin-container";

  container.innerHTML = `
    <h2>₿ محفظة البيتكوين Mix</h2>

    <div class="btc-balance">
      <h3>الرصيد الحالي</h3>
      <p id="btc-balance">جاري التحميل...</p>
    </div>

    <div class="btc-transaction">
      <h3>إرسال / استقبال البيتكوين</h3>
      <input type="text" id="btc-recipient" placeholder="عنوان المستلم">
      <input type="number" id="btc-amount" placeholder="المبلغ (BTC)">
      <button id="btc-send-btn">إرسال</button>
    </div>

    <div class="btc-history">
      <h3>سجل المعاملات</h3>
      <div id="btc-history-list">جاري التحميل...</div>
    </div>
  `;

  app.innerHTML = "";
  app.appendChild(container);

  loadBalance();
  loadHistory();

  document.getElementById("btc-send-btn").addEventListener("click", async () => {
    const recipient = document.getElementById("btc-recipient").value;
    const amount = parseFloat(document.getElementById("btc-amount").value);

    if (!recipient || !amount) return alert("يرجى تعبئة جميع الحقول");

    try {
      const res = await apiFetch("bitcoin/send", {
        method: "POST",
        body: JSON.stringify({ recipient, amount })
      });
      alert(res.message || "تم الإرسال بنجاح");
      loadBalance();
      loadHistory();
    } catch (err) {
      console.error(err);
      alert("خطأ في إرسال البيتكوين");
    }
  });
}

// تحميل الرصيد
async function loadBalance() {
  const balanceEl = document.getElementById("btc-balance");
  try {
    const data = await apiFetch("bitcoin/balance");
    balanceEl.textContent = data.balance + " BTC";
  } catch (err) {
    console.error(err);
    balanceEl.textContent = "خطأ في التحميل";
  }
}

// تحميل سجل المعاملات
async function loadHistory() {
  const historyEl = document.getElementById("btc-history-list");
  try {
    const data = await apiFetch("bitcoin/history");
    if (!data || data.length === 0) {
      historyEl.innerHTML = "لا توجد معاملات";
      return;
    }

    historyEl.innerHTML = data.map(tx => `
      <div class="btc-transaction-item">
        <p>${tx.type} - ${tx.amount} BTC</p>
        <small>${tx.date} | مستخدم: ${tx.user}</small>
      </div>
    `).join("");
  } catch (err) {
    console.error(err);
    historyEl.textContent = "خطأ في التحميل";
  }
}
