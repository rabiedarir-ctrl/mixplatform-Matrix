// pages/settings.js

import { apiFetch, apiPost } from "../config/api.js";

export function loadSettings(app) {
  // الحاوية الرئيسية
  const container = document.createElement("div");
  container.className = "settings-container";

  // عنوان الصفحة
  const title = document.createElement("h2");
  title.textContent = "إعدادات منصة Mix";

  // إعدادات المستخدم
  const form = document.createElement("form");
  form.id = "settings-form";

  // إعدادات افتراضية
  const settings = [
    { label: "الوضع الليلي", key: "darkMode", type: "checkbox" },
    { label: "تشغيل الصوت تلقائياً", key: "autoSound", type: "checkbox" },
    { label: "عدد العناصر بالصفحة", key: "itemsPerPage", type: "number", min: 1, max: 100 }
  ];

  settings.forEach(setting => {
    const field = document.createElement("div");
    field.className = "setting-field";

    const label = document.createElement("label");
    label.textContent = setting.label;
    label.htmlFor = setting.key;

    let input;
    if (setting.type === "checkbox") {
      input = document.createElement("input");
      input.type = "checkbox";
      input.id = setting.key;
    } else {
      input = document.createElement("input");
      input.type = setting.type;
      input.id = setting.key;
      if (setting.min) input.min = setting.min;
      if (setting.max) input.max = setting.max;
    }

    field.appendChild(label);
    field.appendChild(input);
    form.appendChild(field);
  });

  // زر حفظ
  const saveBtn = document.createElement("button");
  saveBtn.type = "submit";
  saveBtn.textContent = "حفظ الإعدادات";
  saveBtn.className = "save-btn";

  form.appendChild(saveBtn);

  container.appendChild(title);
  container.appendChild(form);
  app.innerHTML = "";
  app.appendChild(container);

  // تحميل الإعدادات من API
  loadUserSettings();

  // حدث الحفظ
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newSettings = {};
    settings.forEach(s => {
      const input = document.getElementById(s.key);
      newSettings[s.key] = s.type === "checkbox" ? input.checked : input.value;
    });

    try {
      const response = await apiPost("user-settings", newSettings);
      if (response && response.success) {
        alert("تم حفظ الإعدادات بنجاح");
      } else {
        alert("فشل حفظ الإعدادات");
      }
    } catch (err) {
      console.error("Settings Save Error:", err);
      alert("حدث خطأ أثناء حفظ الإعدادات");
    }
  });
}

// دالة تحميل الإعدادات من API
async function loadUserSettings() {
  try {
    const data = await apiFetch("user-settings");
    if (!data) return;
    for (const key in data) {
      const input = document.getElementById(key);
      if (!input) continue;
      if (input.type === "checkbox") {
        input.checked = data[key];
      } else {
        input.value = data[key];
      }
    }
  } catch (err) {
    console.error("Settings Load Error:", err);
  }
}
