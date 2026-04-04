// 🚀 Mix Platform - Frontend Main.js (Ultimate SPA + Auth + Lazy Load)

// ===== CONFIG =====
const MIX_API_BASE = "http://localhost:3000"; // رابط Backend مؤقت
const ENTRY_CODE = "MIX-001"; // رمز الدخول

// ===== DOM Elements =====
const app = document.getElementById("app");
const statusText = document.getElementById("status-text");

// ===== Module & CSS Cache =====
const moduleCache = {};
const cssCache = {};

// ===== User Auth Simulation =====
let USER_LOGGED_IN = false;
function checkAuth(page) {
    const protectedPages = ["#dashboard", "#wallet", "#manager", "#settings"];
    if (protectedPages.includes(page) && !USER_LOGGED_IN) {
        app.innerHTML = `
            <div class="auth">
                🔐 الرجاء تسجيل الدخول للوصول إلى هذه الصفحة
                <br><button id="login-btn">تسجيل الدخول</button>
            </div>`;
        document.getElementById("login-btn").onclick = () => {
            USER_LOGGED_IN = true;
            router(); // إعادة تحميل الصفحة بعد تسجيل الدخول
        };
        return false;
    }
    return true;
}

// ===== Routes Configuration =====
const routes = {
    "#home": { js: "../pages/home.js", css: "../pages/home.css" },
    "#dashboard": { js: "../pages/dashboard.js", css: "../pages/dashboard.css" },
    "#social": { js: "../pages/social.js", css: "../pages/social.css" },
    "#games": { js: "../pages/games.js", css: "../pages/games.css" },
    "#metaverse": { js: "../pages/metaverse.js", css: "../pages/metaverse.css" },
    "#matrix": { js: "../pages/matrix.js", css: "../pages/matrix.css" },
    "#gps": { js: "../pages/gps.js", css: "../pages/gps.css" },
    "#wallet": { js: "../pages/wallet.js", css: "../pages/wallet.css" },
    "#bitcoin": { js: "../pages/bitcoin.js", css: "../pages/bitcoin.css" },
    "#manager": { js: "../pages/manager.js", css: "../pages/manager.css" },
    "#settings": { js: "../pages/settings.js", css: "../pages/settings.css" },
};

// ===== Helper: Load CSS dynamically =====
async function loadCSS(path) {
    if (cssCache[path]) return; // Already loaded
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = path;
    document.head.appendChild(link);
    cssCache[path] = true;
}

// ===== Loading & Error UI =====
function showLoading() {
    app.innerHTML = `<div class="loading">⏳ جاري تحميل الصفحة...</div>`;
}

function showError(error) {
    console.error(error);
    app.innerHTML = `<div class="error">❌ حدث خطأ: ${error.message || error}</div>`;
}

// ===== Router Function =====
async function router() {
    const hash = window.location.hash || "#home";
    showLoading();

    if (!checkAuth(hash)) return;

    try {
        // Load CSS
        if (routes[hash]?.css) await loadCSS(routes[hash].css);

        // Load JS Module
        let module;
        if (moduleCache[hash]) module = moduleCache[hash];
        else {
            module = await import(routes[hash].js);
            moduleCache[hash] = module;
        }

        // Call load function
        const loaderName = Object.keys(module).find(k => k.startsWith("load"));
        if (!loaderName) throw new Error("No load function found in module");
        module[loaderName](app);

        // Special functions
        if (hash === "#store") fetchChairs();
        if (hash === "#dashboard") fetchHealth();

        // Save last page
        localStorage.setItem("last_page", hash);

    } catch (error) {
        showError(error);
    }
}

// ===== Restore Last Page =====
function restorePage() {
    const last = localStorage.getItem("last_page");
    if (last) window.location.hash = last;
}

// ===== Connection Status =====
function updateStatus() {
    if (!statusText) return;
    statusText.textContent = navigator.onLine ? "🟢 متصل" : "🔴 بدون اتصال";
}

// ===== Self-Heal (Errors Logging) =====
function selfHeal() {
    window.addEventListener("error", e => {
        console.warn("⚠️ Self-Heal Triggered:", e.message);
    });
}

// ===== Legacy Functions =====
async function fetchHealth() {
    if (!MIX_API_BASE) return;
    try {
        const res = await fetch(`${MIX_API_BASE}/health`, { headers: { "X-MIX-CODE": ENTRY_CODE } });
        console.log("Health API:", await res.json());
    } catch (err) { console.error(err); }
}

async function fetchChairs() {
    if (!MIX_API_BASE) {
        const demoData = [
            { name: "Chair Alpha", color: "Red", price: 120 },
            { name: "Chair Beta", color: "Blue", price: 150 }
        ];
        displayChairs(demoData);
        return;
    }
    try {
        const res = await fetch(`${MIX_API_BASE}/chairs`, { headers: { "X-MIX-CODE": ENTRY_CODE } });
        displayChairs(await res.json());
    } catch (err) { console.error(err); }
}

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

// ===== Events =====
window.addEventListener("load", () => {
    restorePage();
    router();
    updateStatus();
    selfHeal();
});
window.addEventListener("hashchange", router);
window.addEventListener("online", updateStatus);
window.addEventListener("offline", updateStatus);

console.log("🚀 Mix Platform Frontend Main.js Ready");
