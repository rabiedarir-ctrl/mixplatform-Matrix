// ========================================
// Mix Platform - Frontend Main JS (Fixed)
// ========================================

// ---- Configuration ----
const MIX_API_BASE = ""; // اتركه فارغ مؤقتًا (لا تستعمل localhost)
const ENTRY_CODE = "MIX-001";

// ---- Fetch Health (اختياري) ----
async function fetchHealth() {
  if (!MIX_API_BASE) return;

  try {
    const res = await fetch(`${MIX_API_BASE}/health`, {
      headers: { "X-MIX-CODE": ENTRY_CODE }
    });
    const data = await res.json();
    console.log("Mix Platform Health:", data);
  } catch (error) {
    console.error("Health API Error:", error);
  }
}

// ---- Fetch Chairs (اختياري) ----
async function fetchChairs() {
  if (!MIX_API_BASE) {
    // بيانات تجريبية بدل API
    const demoData = [
      { name: "Chair Alpha", color: "Red", price: 120 },
      { name: "Chair Beta", color: "Blue", price: 150 }
    ];
    displayChairs(demoData);
    return;
  }

  try {
    const res = await fetch(`${MIX_API_BASE}/chairs`, {
      headers: { "X-MIX-CODE": ENTRY_CODE }
    });
    const chairs = await res.json();
    displayChairs(chairs);
  } catch (error) {
    console.error("Chairs API Error:", error);
  }
}

// ---- Display Chairs ----
function displayChairs(chairs) {
  const container = document.getElementById("store-items");

  if (!container) return;

  container.innerHTML = "";

  chairs.forEach(chair => {
    const div = document.createElement("div");
    div.classList.add("chair");

    div.innerHTML = `
      <h3>${chair.name}</h3>
      <p>Color: ${chair.color}</p>
      <p>Price: $${chair.price}</p>
    `;

    container.appendChild(div);
  });
}

// ---- Initialization ----
document.addEventListener("DOMContentLoaded", () => {
  console.log("Mix Platform Frontend Loaded");

  // عرض رسالة أولية
  const store = document.getElementById("store-items");
  if (store) {
    store.innerHTML = "جارٍ تحميل البيانات...";
  }

  // تشغيل الوظائف
  fetchHealth();
  fetchChairs();
});
