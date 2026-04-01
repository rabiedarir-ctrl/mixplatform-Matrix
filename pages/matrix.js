// pages/matrix.js

// Mix Platform - Dream Matrix

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "./pages/matrix.css";
document.head.appendChild(link);

import { apiFetch } from "../config/api.js";

export function loadMatrix(app) {
  const container = document.createElement("div");
  container.className = "matrix-container";

  container.innerHTML = `
    <h2>💤 نظام الأحلام - Dream Matrix</h2>

    <div class="matrix-controls">
      <input type="text" id="dream-title" placeholder="عنوان الحلم..." />
      <textarea id="dream-content" placeholder="تفاصيل الحلم..."></textarea>
      <button id="save-dream">حفظ الحلم</button>
    </div>

    <div class="matrix-list">
      <h3>قائمة الأحلام</h3>
      <ul id="dream-list"></ul>
    </div>
  `;

  app.innerHTML = "";
  app.appendChild(container);

  const dreamListEl = document.getElementById("dream-list");

  async function loadDreams() {
    const dreams = await apiFetch("matrix/dreams");
    dreamListEl.innerHTML = dreams
      .map(d => `<li><strong>${d.title}</strong>: ${d.content}</li>`)
      .join("");
  }

  async function saveDream() {
    const title = document.getElementById("dream-title").value.trim();
    const content = document.getElementById("dream-content").value.trim();

    if (!title || !content) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    await apiFetch("matrix/dreams/save", {
      method: "POST",
      body: JSON.stringify({ title, content })
    });

    document.getElementById("dream-title").value = "";
    document.getElementById("dream-content").value = "";
    loadDreams();
  }

  document.getElementById("save-dream").addEventListener("click", saveDream);

  loadDreams();
}
