//  config/api.js

//  رابط API الأساسي
export const MIX_API_BASE = "https://api.mix-rd.com";

//  تخزين التوكن
let AUTH_TOKEN = null;

//  تعيين التوكن
export function setToken(token) {
  AUTH_TOKEN = token;
}

//  حذف التوكن
export function clearToken() {
  AUTH_TOKEN = null;
}

//  دالة رئيسية لجميع الطلبات
export async function apiRequest(endpoint, options = {}, retry = 1) {
  try {
    const response = await fetch(`${MIX_API_BASE}/${endpoint}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(AUTH_TOKEN && {
          "Authorization": `Bearer ${AUTH_TOKEN}`
        }),
        ...options.headers
      },
      body: options.body ? JSON.stringify(options.body) : null,
      mode: "cors"
    });

    //  إذا الرد غير ناجح
    if (!response.ok) {
      throw new Error(`API ERROR: ${response.status}`);
    }

    //  تحويل إلى JSON
    return await response.json();

  } catch (error) {

    console.error("API REQUEST FAILED:", error);

    //  إعادة المحاولة
    if (retry > 0) {
      console.warn("Retrying...");
      return apiRequest(endpoint, options, retry - 1);
    }

    return null;
  }
}

---

# دوال جاهزة للاستعمال

//  جلب البيانات
export function apiGet(endpoint) {
  return apiRequest(endpoint);
}

// إرسال بيانات
export function apiPost(endpoint, data) {
  return apiRequest(endpoint, {
    method: "POST",
    body: data
  });
}

// تحديث بيانات
export function apiPut(endpoint, data) {
  return apiRequest(endpoint, {
    method: "PUT",
    body: data
  });
}

// حذف
export function apiDelete(endpoint) {
  return apiRequest(endpoint, {
    method: "DELETE"
  });
}

---

# خدمات منصة Mix

// المنشورات
export function getPosts() {
  return apiGet("posts");
}

// المستخدم
export function getUser() {
  return apiGet("user");
}

// تسجيل الدخول
export async function login(email, password) {
  const data = await apiPost("login", { email, password });

  if (data && data.token) {
    setToken(data.token);
  }

  return data;
}

// تسجيل جديد
export function register(userData) {
  return apiPost("register", userData);
}

// لايك
export function likePost(postId) {
  return apiPost(`posts/${postId}/like`);
}

// تعليق
export function commentPost(postId, text) {
  return apiPost(`posts/${postId}/comment`, { text });
}
