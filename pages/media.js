// pages/media.js

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "./pages/media.css";
document.head.appendChild(link);

import { apiFetch } from "../config/api.js";
<div class="media-container">
  <h2>قناة Mix</h2>

  <div class="radio-player">
    <button>تشغيل</button>
    <p>الراديو المباشر</p>
  </div>

  <div class="tv-channels">
    <div class="channel-card">
      <h3>Mix TV 1</h3>
      <p>الوصف</p>
    </div>
    <div class="channel-card">
      <h3>Mix TV 2</h3>
      <p>الوصف</p>
    </div>
  </div>
</div>
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
