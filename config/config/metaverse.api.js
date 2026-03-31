// config/metaverse.api.js

const METAVERSE_API_BASE = "https://rabiedarir-ctrl.github.io/mixplatform-Matrix/metaverse";

// دالة عامة للتعامل مع API
async function metaverseFetch(endpoint, options = {}) {
  try {
    const res = await fetch(`${METAVERSE_API_BASE}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Metaverse API Error:", err);
    return null;
  }
}

// تحميل العوالم (Worlds)
export async function getWorlds() {
  return await metaverseFetch("worlds");
}

// تحميل الشخصيات (Avatars)
export async function getAvatars() {
  return await metaverseFetch("avatars");
}

// تحميل العناصر (Objects)
export async function getObjects() {
  return await metaverseFetch("objects");
}

//  دخول عالم معين
export async function enterWorld(worldId) {
  return await metaverseFetch(`worlds/${worldId}/enter`, {
    method: "POST"
  });
}

//  إنشاء Avatar جديد
export async function createAvatar(data) {
  return await metaverseFetch("avatars/create", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

//  تحديث Avatar
export async function updateAvatar(id, data) {
  return await metaverseFetch(`avatars/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}

// 🗑️ حذف Avatar
export async function deleteAvatar(id) {
  return await metaverseFetch(`avatars/${id}`, {
    method: "DELETE"
  });
}
