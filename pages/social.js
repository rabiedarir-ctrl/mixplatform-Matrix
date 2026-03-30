// pages/social.js

import {
  getPosts,
  likePost,
  commentPost
} from "../config/api.js";

// تحميل الصفحة الاجتماعية
export function loadSocial(app) {

  const container = document.createElement("div");
  container.className = "social-container";

  container.innerHTML = `
    <h2>Mix Social</h2>
    <div id="posts">جاري تحميل المنشورات...</div>
  `;

  app.innerHTML = "";
  app.appendChild(container);

  loadPosts();
}

// تحميل المنشورات
async function loadPosts() {
  const postsContainer = document.getElementById("posts");

  try {
    const posts = await getPosts();

    if (!posts || posts.length === 0) {
      postsContainer.innerHTML = "لا توجد منشورات";
      return;
    }

    postsContainer.innerHTML = posts.map(post => `
      <div class="post" data-id="${post.id}">
        
        <h3>${post.title || "بدون عنوان"}</h3>
        <p>${post.body || ""}</p>

        <div class="actions">
          <button onclick="handleLike(${post.id})">
             ${post.likes || 0}
          </button>
        </div>

        <div class="comments">
          ${(post.comments || []).map(c => `
            <div class="comment">${c.text}</div>
          `).join("")}
        </div>

        <input 
          type="text" 
          placeholder="اكتب تعليق..."
          id="comment-${post.id}"
        />

        <button onclick="handleComment(${post.id})">
          💬 إرسال
        </button>

      </div>
    `).join("");

  } catch (error) {
    console.error(error);
    postsContainer.innerHTML = "خطأ في تحميل المنشورات";
  }
}

// لايك
window.handleLike = async function(postId) {
  await likePost(postId);
  loadPosts(); // تحديث
};

// تعليق
window.handleComment = async function(postId) {
  const input = document.getElementById(`comment-${postId}`);
  const text = input.value;

  if (!text) return;

  await commentPost(postId, text);
  input.value = "";

  loadPosts(); // تحديث
};
