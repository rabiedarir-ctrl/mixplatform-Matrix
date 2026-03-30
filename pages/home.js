// pages/home.js

import { apiFetch } from "../config/api.js";

export function loadHome(app) {
  // الحاوية الرئيسية
  const container = document.createElement("div");
  container.className = "home-container";

  // عنوان الصفحة
  const title = document.createElement("h2");
  title.textContent = "الصفحة الرئيسية";

  // منطقة عرض البيانات
  const feed = document.createElement("div");
  feed.id = "social-feed";
  feed.innerHTML = "⏳ جاري تحميل المنشورات...";

  // إضافة العناصر
  container.appendChild(title);
  container.appendChild(feed);
  app.appendChild(container);

  // جلب البيانات من API
  loadPosts(feed);
}

// دالة تحميل المنشورات
async function loadPosts(feed) {
  try {
    const data = await apiFetch("posts");

    // إذا فشل
    if (!data || data.length === 0) {
      feed.innerHTML = "لا توجد بيانات حالياً";
      return;
    }

    // عرض البيانات
    feed.innerHTML = data.map(post => `
      <div class="card">
        <h3>${post.title || "بدون عنوان"}</h3>
        <p>${post.body || "..."}</p>
      </div>
    `).join("");

  } catch (error) {
    console.error("Home Error:", error);
    feed.innerHTML = "خطأ في تحميل البيانات";
  }
}
