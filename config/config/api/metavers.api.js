// api/metavers.api.js
// واجهة API خاصة بالـ Metaverse في Mix Platform

const BASE_URL = "https://rabiedarir-ctrl.github.io/mixplatform-Matrix/metaverse";

// دالة Fetch عامة
async function apiFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      ...options
    });
    if (!res.ok) throw new Error("خطأ في الاتصال بالـ API");
    return await res.json();
  } catch (err) {
    console.error("Metaverse API Error:", err);
    return null;
  }
}

// تحميل جميع العوالم الافتراضية
export async function getWorlds() {
  return await apiFetch("worlds");
}

// إنشاء عالم جديد
export async function createWorld(name, ownerId) {
  return await apiFetch("worlds/create", {
    method: "POST",
    body: JSON.stringify({ name, ownerId })
  });
}

// إنشاء شخصية افتراضية للمستخدم
export async function createAvatar(userId, avatarData) {
  return await apiFetch("avatars/create", {
    method: "POST",
    body: JSON.stringify({ userId, avatarData })
  });
}

// تحديث بيانات الشخصية الافتراضية
export async function updateAvatar(avatarId, avatarData) {
  return await apiFetch(`avatars/${avatarId}/update`, {
    method: "PUT",
    body: JSON.stringify({ avatarData })
  });
}

// إدارة الأصول الافتراضية
export async function getAssets(worldId) {
  return await apiFetch(`worlds/${worldId}/assets`);
}

export async function createAsset(worldId, assetData) {
  return await apiFetch(`worlds/${worldId}/assets/create`, {
    method: "POST",
    body: JSON.stringify({ assetData })
  });
}

// سجل الأحداث داخل العالم الافتراضي
export async function getWorldEvents(worldId) {
  return await apiFetch(`worlds/${worldId}/events`);
}

// حذف عالم افتراضي
export async function deleteWorld(worldId) {
  return await apiFetch(`worlds/${worldId}/delete`, {
    method: "DELETE"
  });
}

// 🔔 حذف شخصية افتراضية
export async function deleteAvatar(avatarId) {
  return await apiFetch(`avatars/${avatarId}/delete`, {
    method: "DELETE"
  });
}
