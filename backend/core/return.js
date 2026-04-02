// return.js - Mix Platform Data Return Module
// يمكن استخدامه للـ Frontend و Backend

const fs = require('fs');
const path = require('path');

// المسار إلى مجلد التخزين
const storageDir = path.join(__dirname, '../storage');
const dataPath = path.join(storageDir, 'data.json');

// قراءة البيانات من storage/data.json
function readData() {
    try {
        if (!fs.existsSync(dataPath)) {
            // إذا لم يكن الملف موجودًا، انشئه ببيانات فارغة
            const emptyData = {
                social: [],
                store: [],
                wallet: [],
                games: [],
                metaverse: [],
                matrix: []
            };
            fs.writeFileSync(dataPath, JSON.stringify(emptyData, null, 2));
            return emptyData;
        }

        const rawData = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(rawData);
    } catch (err) {
        console.error('Error reading data.json:', err);
        return {
            social: [],
            store: [],
            wallet: [],
            games: [],
            metaverse: [],
            matrix: []
        };
    }
}

// كتابة البيانات إلى storage/data.json
function writeData(data) {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing data.json:', err);
    }
}

// دالة إرجاع بيانات لأي وحدة
function getData(moduleName) {
    const data = readData();
    return data[moduleName] || [];
}

// دالة لإضافة عنصر جديد لأي وحدة
function addData(moduleName, newItem) {
    const data = readData();
    const id = Date.now(); // معرف فريد
    const item = { id, ...newItem };

    if (!data[moduleName]) {
        data[moduleName] = [];
    }

    data[moduleName].push(item);
    writeData(data);
    return item;
}

// دالة حذف عنصر حسب معرف
function removeData(moduleName, id) {
    const data = readData();
    if (!data[moduleName]) return null;

    const index = data[moduleName].findIndex(item => item.id === id);
    if (index === -1) return null;

    const removed = data[moduleName].splice(index, 1)[0];
    writeData(data);
    return removed;
}

// دالة تحديث عنصر
function updateData(moduleName, id, updatedFields) {
    const data = readData();
    if (!data[moduleName]) return null;

    const item = data[moduleName].find(item => item.id === id);
    if (!item) return null;

    Object.assign(item, updatedFields);
    writeData(data);
    return item;
}

// تصدير الوظائف
module.exports = {
    readData,
    writeData,
    getData,
    addData,
    removeData,
    updateData
};
