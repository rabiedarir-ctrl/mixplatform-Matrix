const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

// تحديد مجلد الواجهة
const frontendPath = path.join(__dirname);

// ملفات ثابتة (HTML, CSS, JS)
app.use(express.static(frontendPath));

// SPA fallback (أي رابط يرجع index.html)
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`🚀 Frontend running on http://localhost:${PORT}`);
});
