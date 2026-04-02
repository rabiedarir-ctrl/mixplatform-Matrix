// config/media.api.js

const MEDIA_API_BASE = "http://localhost:3000/api/media";

/**
 * تنفيذ طلب API للوسائط
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
 * جلب قائمة ملفات الوسائط
 * @returns {Promise<Array>} قائمة الوسائط
 */
export async function getMediaList() {
  const data = await mediaApiFetch("list");
  return data || [];
}

/**
 * رفع ملف وسائط جديد
 * @param {File} file - الملف الذي سيتم رفعه
 * @returns {Promise<object>} نتيجة الرفع
 */
export async function uploadMedia(file) {
  if (!file) throw new Error("ملف الوسائط مطلوب");

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`${MEDIA_API_BASE}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error(`خطأ رفع الملف: ${res.status}`);

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Upload Media Error:", err);
    return null;
  }
}

/**
 * حذف ملف وسائط
 * @param {string} mediaId - معرف الملف
 * @returns {Promise<object>} نتيجة الحذف
 */
export async function deleteMedia(mediaId) {
  if (!mediaId) throw new Error("معرف الملف مطلوب");

  return await mediaApiFetch(`delete/${mediaId}`, { method: "DELETE" });
}
