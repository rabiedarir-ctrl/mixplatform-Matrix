// 📂 pages/settings.js

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "./pages/settings.css";
document.head.appendChild(link);

import { apiFetch } from "../config/api.js";

export function loadSettings(app) {
  app.innerHTML = `
    <section id="settings">
      <h2>⚙️ إعدادات Mix Platform</h2>

      <div class="settings-container">

        <!-- القائمة الجانبية -->
        <div class="settings-menu">
          <button data-tab="general">عام</button>
          <button data-tab="games">الألعاب</button>
          <button data-tab="social">التواصل</button>
          <button data-tab="gps">GPS</button>
          <button data-tab="matrix">Matrix</button>
          <button data-tab="wallet">Wallet</button>
        </div>

        <!-- المحتوى -->
        <div class="settings-content" id="settings-content"></div>

      </div>
    </section>
  `;

  const content = document.getElementById("settings-content");

  function loadTab(tab) {
    switch (tab) {

      case "general":
        content.innerHTML = `
          <h3>⚙️ إعدادات عامة</h3>
          <label>اسم المستخدم</label>
          <input type="text" placeholder="اسمك">

          <label>الوضع الليلي</label>
          <select>
            <option>مفعل</option>
            <option>غير مفعل</option>
          </select>
        `;
        break;

      case "games":
        content.innerHTML = `
          <h3>🎮 إعدادات الألعاب</h3>
          <label>مستوى الصوت</label>
          <input type="range">

          <label>حفظ النتائج</label>
          <select>
            <option>نعم</option>
            <option>لا</option>
          </select>
        `;
        break;

      case "social":
        content.innerHTML = `
          <h3>💬 إعدادات التواصل</h3>
          <label>إظهار الحالة</label>
          <select>
            <option>مرئي</option>
            <option>مخفي</option>
          </select>
        `;
        break;

      case "gps":
        content.innerHTML = `
          <h3>📡 إعدادات GPS</h3>
          <label>تفعيل التتبع</label>
          <select>
            <option>مفعل</option>
            <option>غير مفعل</option>
          </select>
        `;
        break;

      case "matrix":
        content.innerHTML = `
          <h3>🧠 إعدادات Matrix</h3>
          <label>حفظ الأحلام</label>
          <select>
            <option>تلقائي</option>
            <option>يدوي</option>
          </select>
        `;
        break;

      case "wallet":
        content.innerHTML = `
          <h3>💰 إعدادات Wallet</h3>
          <label>العملة الافتراضية</label>
          <select>
            <option>BTC</option>
            <option>USD</option>
          </select>
        `;
        break;
    }
  }

  // تشغيل أولي
  loadTab("general");

  // التنقل بين الإعدادات
  document.querySelectorAll(".settings-menu button").forEach(btn => {
    btn.addEventListener("click", () => {
      loadTab(btn.dataset.tab);
    });
  });
}
