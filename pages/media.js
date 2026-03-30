// pages/media.js

import { apiFetch } from "../config/api.js";

export function loadMedia(app) {
  // الحاوية الرئيسية
  const container = document.createElement("div");
  container.className = "media-container";

  // عنوان القناة
  const tvTitle = document.createElement("h2");
  tvTitle.textContent = "القناة التلفزيونية";

  // بث التلفاز
  const tvPlayer = document.createElement("video");
  tvPlayer.id = "tv-player";
  tvPlayer.controls = true;
  tvPlayer.autoplay = false;
  tvPlayer.width = 640;
  tvPlayer.height = 360;
  tvPlayer.src = "assets/media/tv-stream.mp4"; // مسار مسبق للملف

  // عنوان الراديو
  const radioTitle = document.createElement("h2");
  radioTitle.textContent = "الراديو";

  // بث الراديو
  const radioPlayer = document.createElement("audio");
  radioPlayer.id = "radio-player";
  radioPlayer.controls = true;
  radioPlayer.autoplay = false;
  radioPlayer.src = "assets/media/radio-stream.mp3"; // مسار مسبق للملف

  // إضافة العناصر للحاوية
  container.appendChild(tvTitle);
  container.appendChild(tvPlayer);
  container.appendChild(radioTitle);
  container.appendChild(radioPlayer);

  // ربط الحاوية بالتطبيق
  app.innerHTML = "";
  app.appendChild(container);

  // جلب معلومات من API (اختياري)
  apiFetch("media-info").then(data => {
    if (data) {
      tvTitle.textContent = data.tvTitle || "القناة التلفزيونية";
      radioTitle.textContent = data.radioTitle || "الراديو";

      // تغيير المصادر إذا موجودة من API
      if (data.tvSrc) tvPlayer.src = data.tvSrc;
      if (data.radioSrc) radioPlayer.src = data.radioSrc;
    }
  }).catch(err => console.error("API Media Error:", err));
}
