// config/home.endpoint.js

import express from "express";
import { getStats } from "../core/stats.js";
import { getRecentPosts } from "../core/media.js";
import { getUsers } from "../core/users.js";

const router = express.Router();

/**
 * GET /home
 * جلب بيانات الصفحة الرئيسة
 */
router.get("/", async (req, res) => {
  try {
    const stats = await getStats();          // إحصائيات عامة (users, media, transactions)
    const posts = await getRecentPosts(5);  // آخر 5 منشورات/وسائط
    const users = await getUsers(5);        // آخر 5 مستخدمين

    res.json({
      success: true,
      stats,
      recentPosts: posts,
      recentUsers: users
    });
  } catch (err) {
    console.error("Home Endpoint Error:", err);
    res.status(500).json({ success: false, message: "خطأ في جلب بيانات الصفحة الرئيسة" });
  }
});

/**
 * GET /home/stats
 * جلب الإحصائيات فقط
 */
router.get("/stats", async (req, res) => {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (err) {
    console.error("Home Stats Error:", err);
    res.status(500).json({ success: false, message: "خطأ في جلب الإحصائيات" });
  }
});

/**
 * GET /home/posts
 * جلب آخر المنشورات فقط
 */
router.get("/posts", async (req, res) => {
  try {
    const posts = await getRecentPosts(10);
    res.json(posts);
  } catch (err) {
    console.error("Home Posts Error:", err);
    res.status(500).json({ success: false, message: "خطأ في جلب المنشورات" });
  }
});

/**
 * GET /home/users
 * جلب آخر المستخدمين فقط
 */
router.get("/users", async (req, res) => {
  try {
    const users = await getUsers(10);
    res.json(users);
  } catch (err) {
    console.error("Home Users Error:", err);
    res.status(500).json({ success: false, message: "خطأ في جلب المستخدمين" });
  }
});

export default router;
