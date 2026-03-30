// pages/matrix.js

import { apiFetch } from "../config/api.js";

export function loadMatrix(app) {
  // الحاوية الرئيسية
  const container = document.createElement("div");
  container.className = "matrix-container";

  // عنوان Matrix
  const title = document.createElement("h2");
  title.textContent = "لوحة Matrix - منصة Mix";

  // جدول البيانات
  const matrixTable = document.createElement("div");
  matrixTable.id = "matrix-table";
  matrixTable.style.display = "grid";
  matrixTable.style.gridTemplateColumns = "repeat(5, 1fr)";
  matrixTable.style.gap = "10px";
  matrixTable.style.padding = "10px";

  // إضافة للعناصر الرئيسية
  container.appendChild(title);
  container.appendChild(matrixTable);
  app.innerHTML = "";
  app.appendChild(container);

  // جلب البيانات من API
  updateMatrix(matrixTable);
}

// دالة تحديث Matrix
async function updateMatrix(matrixTable) {
  try {
    const data = await apiFetch("matrix-data"); // endpoint من منصة Mix

    if (!data || data.length === 0) {
      matrixTable.innerHTML = "<p> لا توجد بيانات حالياً</p>";
      return;
    }

    // عرض البيانات
    matrixTable.innerHTML = "";
    data.forEach(item => {
      const cell = document.createElement("div");
      cell.className = "matrix-cell";
      cell.style.padding = "15px";
      cell.style.background = "#1a1a1a";
      cell.style.color = "#0f0";
      cell.style.borderRadius = "8px";
      cell.style.textAlign = "center";
      cell.textContent = item.value || "-";
      matrixTable.appendChild(cell);
    });

  } catch (error) {
    console.error("Matrix API Error:", error);
    matrixTable.innerHTML = "<p> خطأ في تحميل البيانات</p>";
  }
}
