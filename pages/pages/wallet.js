// pages/wallet.js

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "./pages/wallet.css";
document.head.appendChild(link);

import { apiFetch } from "../config/api.js";

export function loadWallet(app) {
  const container = document.createElement("div");
  container.className = "wallet-container";

  container.innerHTML = `
    <h2>محفظة Mix</h2>

    <div class="balance-container">
      <h3>الرصيد الحالي</h3>
      <p id="wallet-balance">جاري التحميل...</p>
    </div>

    <div class="transaction-container">
      <h3>إرسال / استقبال</h3>
      <input type="text" id="recipient" placeholder="المستلم / العنوان">
      <input type="number" id="amount" placeholder="المبلغ">
      <button id="send-btn">إرسال</button>
    </div>

    <div class="history-container">
      <h3>سجل المعاملات</h3>
      <div id="transaction-history">⏳ جاري التحميل...</div>
    </div>
  `;

  app.innerHTML = "";
  app.appendChild(container);

  // تحميل الرصيد
  loadBalance();
  loadHistory();

  // التعامل مع إرسال الأموال
  document.getElementById("send-btn").addEventListener("click", async () => {
    const recipient = document.getElementById("recipient").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (!recipient || !amount) return alert("يرجى تعبئة الحقول");

    try {
      const res = await apiFetch("wallet/send", {
        method: "POST",
        body: JSON.stringify({ recipient, amount })
      });

      alert(res.message || "تم الإرسال بنجاح");
      loadBalance();
      loadHistory();
    } catch (err) {
      console.error(err);
      alert("خطأ في إرسال الأموال");
    }
  });
}

// 📊 تحميل الرصيد
async function loadBalance() {
  const balanceEl = document.getElementById("wallet-balance");
  try {
    const data = await apiFetch("wallet/balance");
    balanceEl.textContent = data.balance + " MIX";
  } catch (err) {
    console.error(err);
    balanceEl.textContent = "خطأ في التحميل";
  }
}

// تحميل سجل المعاملات
async function loadHistory() {
  const historyEl = document.getElementById("transaction-history");
  try {
    const data = await apiFetch("wallet/history");
    if (!data || data.length === 0) {
      historyEl.innerHTML = "لا توجد معاملات";
      return;
    }

    historyEl.innerHTML = data.map(tx => `
      <div class="transaction-item">
        <p>${tx.type} - ${tx.amount} MIX</p>
        <small>${tx.date}</small>
      </div>
    `).join("");
  } catch (err) {
    console.error(err);
    historyEl.textContent = " خطأ في التحميل";
  }
    }
