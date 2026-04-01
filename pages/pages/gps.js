// pages/gps.js

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "./pages/gps.css";
document.head.appendChild(link);


import { apiFetch } from "../config/api.js";

let watchId = null;

export function loadGPS(app) {
  const container = document.createElement("div");
  container.className = "gps-container";

  container.innerHTML = `
    <h2>تتبع مباشر - Mix GPS</h2>

    <div class="gps-info">
      <p>Lat: <span id="lat">--</span></p>
      <p>Lng: <span id="lng">--</span></p>
      <p>Accuracy: <span id="accuracy">--</span></p>
    </div>

    <div class="gps-actions">
      <button id="start-tracking">بدء التتبع</button>
      <button id="stop-tracking">إيقاف</button>
    </div>

    <iframe id="map-frame" height="300"></iframe>
  `;

  app.innerHTML = "";
  app.appendChild(container);

  document.getElementById("start-tracking").addEventListener("click", startTracking);
  document.getElementById("stop-tracking").addEventListener("click", stopTracking);
}

// بدء التتبع
function startTracking() {
  if (!navigator.geolocation) {
    alert("GPS غير مدعوم");
    return;
  }

  watchId = navigator.geolocation.watchPosition(
    async (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;

      // تحديث الواجهة
      document.getElementById("lat").textContent = latitude;
      document.getElementById("lng").textContent = longitude;
      document.getElementById("accuracy").textContent = accuracy + " m";

      // تحديث الخريطة
      const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=16&output=embed`;
      document.getElementById("map-frame").src = mapUrl;

      // إرسال مباشر للسيرفر
      await sendLocation({ latitude, longitude, accuracy });
    },
    (err) => {
      console.error(err);
      alert("خطأ في التتبع");
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000
    }
  );
}

// إيقاف التتبع
function stopTracking() {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
    alert("تم إيقاف التتبع");
  }
}

// إرسال الموقع للسيرفر
async function sendLocation(position) {
  try {
    await apiFetch("gps/live", {
      method: "POST",
      body: JSON.stringify(position)
    });
  } catch (err) {
    console.error("Send GPS Error:", err);
  }
}
