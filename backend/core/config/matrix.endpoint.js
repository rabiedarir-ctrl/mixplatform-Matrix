// config/matrix.endpoint.js
// Mix Platform - Dream Matrix Endpoints
import express from "express";
const router = express.Router();

// مصفوفة مؤقتة لتخزين الأحلام (يمكن استبدالها بقاعدة بيانات)
let dreams = [];

/**
 * GET /matrix/dreams
 * جلب كل الأحلام
 */
router.get("/dreams", (req, res) => {
  res.json(dreams);
});

/**
 * POST /matrix/dreams/save
 * حفظ حلم جديد
 * body: { title: string, content: string }
 */
router.post("/dreams/save", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "يرجى ملء كل الحقول" });
  }

  const id = Date.now().toString();
  const newDream = { id, title, content, createdAt: new Date() };
  dreams.push(newDream);
  res.status(201).json(newDream);
});

/**
 * GET /matrix/dreams/:dreamId
 * جلب حلم محدد
 */
router.get("/dreams/:dreamId", (req, res) => {
  const dream = dreams.find(d => d.id === req.params.dreamId);
  if (!dream) return res.status(404).json({ error: "الحلم غير موجود" });
  res.json(dream);
});

/**
 * PUT /matrix/dreams/update/:dreamId
 * تعديل حلم محدد
 * body: { title?, content? }
 */
router.put("/dreams/update/:dreamId", (req, res) => {
  const dream = dreams.find(d => d.id === req.params.dreamId);
  if (!dream) return res.status(404).json({ error: "الحلم غير موجود" });

  const { title, content } = req.body;
  if (title) dream.title = title;
  if (content) dream.content = content;

  res.json(dream);
});

/**
 * DELETE /matrix/dreams/delete/:dreamId
 * حذف حلم محدد
 */
router.delete("/dreams/delete/:dreamId", (req, res) => {
  const index = dreams.findIndex(d => d.id === req.params.dreamId);
  if (index === -1) return res.status(404).json({ error: "الحلم غير موجود" });

  const deleted = dreams.splice(index, 1)[0];
  res.json({ message: "تم حذف الحلم", dream: deleted });
});

export default router;
