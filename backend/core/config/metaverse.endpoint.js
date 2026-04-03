// config/metaverse.endpoint.js

const METAVERSE_API_BASE = "http://localhost:3000/endpoint/metaverse";

/**
 * تنفيذ أي طلب إلى Metaverse API
 * @param {string} endpoint - مسار API بعد /metaverse
 * @param {object} options - إعدادات fetch (GET, POST, body, headers)
 * @returns {Promise<object>}
 */
export async function metaverseFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${METAVERSE_API_BASE}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`خطأ في الاتصال بـ Metaverse API: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Metaverse API Error:", err);
    return null;
  }
}

/*---وظائف رئيسية---*/

/**
 * جلب قائمة العوالم المتاحة
 * @returns {Promise<Array>} قائمة العوالم
 */
export async function getWorlds() {
  const data = await metaverseFetch("worlds");
  return data || [];
}

/**
 * جلب تفاصيل عالم محدد
 * @param {string} worldId - معرف العالم
 * @returns {Promise<object>}
 */
export async function getWorldDetails(worldId) {
  if (!worldId) throw new Error("World ID مطلوب");
  return await metaverseFetch(`worlds/${worldId}`);
}

/**
 * إنشاء عالم جديد
 * @param {object} payload - بيانات العالم الجديد
 * @returns {Promise<object>}
 */
export async function createWorld(payload) {
  return await metaverseFetch("worlds/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * تحديث بيانات عالم موجود
 * @param {string} worldId - معرف العالم
 * @param {object} payload - البيانات الجديدة
 * @returns {Promise<object>}
 */
export async function updateWorld(worldId, payload) {
  return await metaverseFetch(`worlds/${worldId}/update`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

/**
 * حذف عالم محدد
 * @param {string} worldId - معرف العالم
 * @returns {Promise<object>}
 */
export async function deleteWorld(worldId) {
  return await metaverseFetch(`worlds/${worldId}/delete`, {
    method: "DELETE",
  });
}
