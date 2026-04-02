// config/matrix.api.js
// Mix Platform - Dream Matrix API

const MATRIX_API_BASE = "http://localhost:3000";

/**
 * دالة عامة للتعامل مع Matrix API
 * @param {string} endpoint
 * @param {object} options
 * @returns {Promise<any>}
 */
async function matrixFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${MATRIX_API_BASE}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });

    if (!res.ok) {
      throw new Error(`Matrix API Error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Matrix API Error:", err);
    return null;
  }
}

/**
 * جلب كل الأحلام
 */
export async function getDreams() {
  return await matrixFetch("dreams");
}

/**
 * حفظ حلم جديد
 * @param {{ title: string, content: string }} dream
 */
export async function saveDream(dream) {
  return await matrixFetch("dreams/save", {
    method: "POST",
    body: JSON.stringify(dream)
  });
}

/**
 * جلب حلم محدد
 * @param {string} dreamId
 */
export async function getDream(dreamId) {
  return await matrixFetch(`dreams/${dreamId}`);
}

/**
 * حذف حلم محدد (اختياري)
 * @param {string} dreamId
 */
export async function deleteDream(dreamId) {
  return await matrixFetch(`dreams/delete/${dreamId}`, {
    method: "DELETE"
  });
}

/**
 * تعديل حلم محدد (اختياري)
 * @param {string} dreamId
 * @param {{ title?: string, content?: string }} updates
 */
export async function updateDream(dreamId, updates) {
  return await matrixFetch(`dreams/update/${dreamId}`, {
    method: "PUT",
    body: JSON.stringify(updates)
  });
}
