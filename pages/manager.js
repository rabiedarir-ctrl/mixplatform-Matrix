// pages/manager.js

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "./pages/manager.css";
document.head.appendChild(link);

import { apiFetch } from "../config/api.js";

export function loadManager(app) {
  const container = document.createElement("div");
  container.className = "manager-container";

  container.innerHTML = `
    <h2>مدير أعمال Mix</h2>

    <div class="stats-container">
      <div class="stat-card" id="users-count"></div>
      <div class="stat-card" id="transactions-count"></div>
      <div class="stat-card" id="media-count"></div>
    </div>

    <div class="users-container">
      <h3>المستخدمون</h3>
      <div id="user-list">جاري التحميل...</div>
    </div>

    <div class="transactions-container">
      <h3>سجل المعاملات</h3>
      <div id="transaction-list">جاري التحميل...</div>
    </div>
  `;

  app.innerHTML = "";
  app.appendChild(container);

  loadStats();
  loadUsers();
  loadTransactions();

  // تحديث دوري كل 15 ثانية
  setInterval(() => {
    loadStats();
    loadUsers();
    loadTransactions();
  }, 15000);
}

// إحصائيات عامة
async function loadStats() {
  const data = await apiFetch("manager/stats");
  if (!data) return;

  document.getElementById("users-count").textContent = `👤 المستخدمون: ${data.users}`;
  document.getElementById("transactions-count").textContent = `💰 المعاملات: ${data.transactions}`;
  document.getElementById("media-count").textContent = `🎬 الوسائط: ${data.media}`;
}

// قائمة المستخدمين
async function loadUsers() {
  const container = document.getElementById("user-list");
  try {
    const users = await apiFetch("manager/users");
    if (!users || users.length === 0) {
      container.innerHTML = "لا يوجد مستخدمون";
      return;
    }

    container.innerHTML = users.map(u => `
      <div class="user-item">
        <p>${u.name} - ${u.email}</p>
        <small>تاريخ التسجيل: ${u.date}</small>
      </div>
    `).join("");
  } catch (err) {
    console.error(err);
    container.textContent = "خطأ في تحميل المستخدمين";
  }
}

// سجل المعاملات
async function loadTransactions() {
  const container = document.getElementById("transaction-list");
  try {
    const txs = await apiFetch("manager/transactions");
    if (!txs || txs.length === 0) {
      container.innerHTML = "لا توجد معاملات";
      return;
    }

    container.innerHTML = txs.map(tx => `
      <div class="transaction-item">
        <p>${tx.type} - ${tx.amount} MIX</p>
        <small>${tx.date} | مستخدم: ${tx.user}</small>
      </div>
    `).join("");
  } catch (err) {
    console.error(err);
    container.textContent = " خطأ في تحميل المعاملات";
  }
}
