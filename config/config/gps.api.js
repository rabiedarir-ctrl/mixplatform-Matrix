// config/gps.api.js

const GPS_API_BASE = "http://localhost:3000";

/**
 * دالة عامة للتعامل مع GPS API
 * @param {string} endpoint
 * @param {object} options
 * @returns {Promise<any>}
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
 * حفظ موقع المستخدم مرة واحدة
 * @param {{ latitude: number, longitude: number, accuracy: number }} position
 */
export async function saveLocation(position) {
  return await gpsFetch("save", {
    method: "POST",
    body: JSON.stringify(position)
  });
}

/**
 * إرسال موقع المستخدم في تتبع مباشر (Live Tracking)
 * @param {{ latitude: number, longitude: number, accuracy: number }} position
 */
export async function liveTracking(position) {
  return await gpsFetch("live", {
    method: "POST",
    body: JSON.stringify(position)
  });
}

/**
 * جلب آخر موقع مسجل للمستخدم
 * @param {string} userId
 */
export async function getLastLocation(userId) {
  return await gpsFetch(`last/${userId}`);
}

/**
 * جلب سجل المواقع السابقة للمستخدم
 * @param {string} userId
 */
export async function getHistory(userId) {
  return await gpsFetch(`history/${userId}`);
}
