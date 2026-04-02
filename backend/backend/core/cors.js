// backend/core/cors.js
'use strict';

/**
 * إعدادات CORS لمنصة Mix Platform
 * السماح بالوصول من أي دومين لأغراض التطوير
 * يمكن تعديل origin لاحقًا لدومينات محددة فقط
 */

const cors = require('cors');

// إعدادات CORS العامة
const corsOptions = {
    origin: '*', // يمكن وضع ['https://example.com'] لتقييد الدومينات
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'X-MIX-CODE', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

// تصدير كـ middleware لاستخدامه في server.js
module.exports = cors(corsOptions);
