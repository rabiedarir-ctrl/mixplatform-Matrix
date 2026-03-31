// config/media.endpoint.js

const MEDIA_API_BASE = "https://rabiedarir-ctrl.github.io/mixplatform-Matrix/media";

/**
 * تنفيذ طلب API للملفات الإعلامية
 * @param {string} endpoint - مسار API بعد /media
 * @param {object} options - إعدادات fetch (GET, POST, body, headers)
 * @returns {Promise<object>}
 */
export async function mediaApiFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${MEDIA_API_BASE}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error(`خطأ في الاتصال بـ Media API: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Media API Error:", err);
    return null;
  }
}

/*---وظائف رئيسية---*/

/**
 * جلب قائمة الملفات الإعلامية
 * @returns {Promise<Array>} قائمة الملفات
 */
export async function getMediaList() {
  const data = await mediaApiFetch("list");
  return data || [];
}

/**
 * رفع ملف جديد
 * @param {FormData} formData - بيانات الملف
 * @returns {Promise<object>} نتيجة الرفع
 */
export async function uploadMedia(formData) {
  try {
    const res = await fetch(`${MEDIA_API_BASE}/upload`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("فشل رفع الملف");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * حذف ملف إعلامي
 * @param {string} fileId - معرف الملف
 * @returns {Promise<object>} نتيجة الحذف
 */
export async function deleteMedia(fileId) {
  return await mediaApiFetch(`delete/${fileId}`, { method: "DELETE" });
}
