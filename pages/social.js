// pages/social.js

export function loadSocial(app) {
    app.innerHTML = `
        <section id="social">
            <h2>💬 التواصل الاجتماعي</h2>

            <!-- 👤 المستخدمون -->
            <div id="users-list">جارٍ التحميل...</div>

            <!-- 💬 التعليقات -->
            <div id="comments-list">جارٍ التحميل...</div>

            <!-- 📷 رفع صور -->
            <div id="upload-section">
                <input type="file" id="file-input" />
                <button id="upload-btn">رفع الصورة</button>
            </div>

            <!-- 🔴 بث مباشر -->
            <div id="live-stream">
                <video id="live-video" controls autoplay muted></video>
            </div>

            <!-- 🤖 دمج AI -->
            <div id="ai-section">
                <input type="text" id="ai-input" placeholder="اسأل AI..." />
                <button id="ai-btn">إرسال</button>
                <div id="ai-response" class="ai-response"></div>
            </div>
        </section>
    `;

    // تحميل المستخدمين من Backend
    fetch('/api/users')
      .then(res => res.json())
      .then(users => {
          const usersList = document.getElementById('users-list');
          usersList.innerHTML = '';
          users.forEach(u => {
              const div = document.createElement('div');
              div.className = 'user-profile';
              div.innerHTML = `<img src="${u.avatar}" alt="${u.name}"/><span>${u.name}</span>`;
              usersList.appendChild(div);
          });
      }).catch(console.error);

    // تحميل التعليقات
    fetch('/api/comments')
      .then(res => res.json())
      .then(comments => {
          const commentsList = document.getElementById('comments-list');
          commentsList.innerHTML = '';
          comments.forEach(c => {
              const div = document.createElement('div');
              div.className = 'comment';
              div.textContent = `${c.user}: ${c.text}`;
              commentsList.appendChild(div);
          });
      }).catch(console.error);

    // رفع الصور
    document.getElementById('upload-btn').addEventListener('click', () => {
        const file = document.getElementById('file-input').files[0];
        if (!file) return alert("اختر ملف أولاً");

        const formData = new FormData();
        formData.append('image', file);

        fetch('/api/upload', { method: 'POST', body: formData })
          .then(res => res.json())
          .then(data => alert("تم رفع الصورة بنجاح"))
          .catch(err => console.error(err));
    });

    // AI
    document.getElementById('ai-btn').addEventListener('click', () => {
        const question = document.getElementById('ai-input').value;
        if (!question) return;

        fetch('/api/ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('ai-response').textContent = data.answer;
        })
        .catch(console.error);
    });

    // بث مباشر (مثال تجريبي)
    const video = document.getElementById('live-video');
    video.src = '/api/live-stream';
}
