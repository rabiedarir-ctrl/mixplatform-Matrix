// pages/dashboard.js

import { apiFetch } from "../config/api.js";

// تحميل مكتبة Chart.js
const chartScript = document.createElement("script");
chartScript.src = "https://cdn.jsdelivr.net/npm/chart.js";
document.head.appendChild(chartScript);

export function loadDashboard(app) {
  const container = document.createElement("div");
  container.className = "dashboard-container";

  container.innerHTML = `
    <h2>لوحة التحكم - Mix</h2>

    <div class="stats-container">
      <div class="stat-card" id="users"></div>
      <div class="stat-card" id="posts"></div>
      <div class="stat-card" id="comments"></div>
    </div>

    <canvas id="statsChart"></canvas>

    <div class="activity-container">
      <h3>النشاطات</h3>
      <div id="activity-list"> جاري التحميل...</div>
    </div>
  `;

  app.innerHTML = "";
  app.appendChild(container);

  loadStats();
  loadActivity();

  // تحديث تلقائي كل 10 ثواني
  setInterval(() => {
    loadStats();
    loadActivity();
  }, 10000);
}

// تحميل الإحصائيات + رسم Chart
async function loadStats() {
  const data = await apiFetch("dashboard-stats");

  if (!data) return;

  document.getElementById("users").textContent = `👤 ${data.users}`;
  document.getElementById("posts").textContent = `📝 ${data.posts}`;
  document.getElementById("comments").textContent = `💬 ${data.comments}`;

  renderChart(data);
}

// رسم Chart
function renderChart(data) {
  const ctx = document.getElementById("statsChart");

  if (!ctx) return;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Users", "Posts", "Comments"],
      datasets: [{
        label: "Mix Data",
        data: [data.users, data.posts, data.comments]
      }]
    }
  });
}

// النشاطات
async function loadActivity() {
  const container = document.getElementById("activity-list");

  const data = await apiFetch("dashboard-activity");

  if (!data) {
    container.innerHTML = " خطأ";
    return;
  }

  container.innerHTML = data.map(item => `
    <div class="activity-item">
      <p>${item.text}</p>
      <small>${item.date}</small>
    </div>
  `).join("");
}
