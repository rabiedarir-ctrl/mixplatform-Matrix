// config/gps.endpoint.js

const GPS_API_BASE = "http://localhost:3000/endpoint/gps";

/**
 * دالة عامة للتعامل مع GPS API
 */
async function gpsFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${GPS_API_BASE}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });

    if (!res.ok) {
      throw new Error(`GPS API Error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("GPS API Error:", err);
    return null;
  }
}

/**
 * حفظ الموقع الحالي
 * @param {Object} position { latitude, longitude, accuracy }
 */
export async function saveLocation(position) {
  return await gpsFetch("save", {
    method: "POST",
    body: JSON.stringify(position)
  });
}

/**
 * تتبع مباشر Live Tracking
 * @param {Object} position { latitude, longitude, accuracy }
 */
export async function liveTracking(position) {
  return await gpsFetch("live", {
    method: "POST",
    body: JSON.stringify(position)
  });
}

/**
 * جلب آخر موقع للمستخدم
 */
export async function getLastLocation(userId) {
  return await gpsFetch(`last/${userId}`);
}

/**
 * جلب كل المواقع السابقة للمستخدم
 */
export async function getHistory(userId) {
  return await gpsFetch(`history/${userId}`);
}
