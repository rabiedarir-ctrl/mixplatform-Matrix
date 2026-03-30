// pages/store.js

import { apiGet, apiPost } from "../config/api.js";

export function loadStore(app) {
  // الحاوية الرئيسية
  const container = document.createElement("div");
  container.className = "store-container";

  // العنوان
  const title = document.createElement("h2");
  title.textContent = "🛒 متجر Mix";

  // شريط البحث
  const searchInput = document.createElement("input");
  searchInput.placeholder = "ابحث عن منتج...";
  searchInput.className = "search-box";

  // المنتجات
  const productGrid = document.createElement("div");
  productGrid.className = "product-grid";
  productGrid.innerHTML = "⏳ جاري تحميل المنتجات...";

  // تركيب الصفحة
  container.appendChild(title);
  container.appendChild(searchInput);
  container.appendChild(productGrid);
  app.appendChild(container);

  // تحميل المنتجات
  loadProducts(productGrid);

  // البحث
  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    filterProducts(value, productGrid);
  });
}

// تخزين المنتجات مؤقتاً
let ALL_PRODUCTS = [];

// تحميل المنتجات من API
async function loadProducts(grid) {
  try {
    const data = await apiGet("products");

    if (!data || data.length === 0) {
      grid.innerHTML = "لا توجد منتجات";
      return;
    }

    ALL_PRODUCTS = data;

    renderProducts(data, grid);

  } catch (error) {
    console.error("Store Error:", error);
    grid.innerHTML = "خطأ في تحميل المنتجات";
  }
}

// عرض المنتجات
function renderProducts(products, grid) {
  grid.innerHTML = products.map(product => `
    <div class="product-card">
      <img src="${product.image || ''}" alt="product">
      <h3>${product.name || "منتج"}</h3>
      <p>${product.description || ""}</p>
      <strong>${product.price || "0"} $</strong>

      <button onclick="addToCart(${product.id})">
         إضافة للسلة
      </button>
    </div>
  `).join("");
}

// فلترة المنتجات
function filterProducts(query, grid) {
  const filtered = ALL_PRODUCTS.filter(p =>
    (p.name || "").toLowerCase().includes(query)
  );

  renderProducts(filtered, grid);
}

// 🛒 سلة مؤقتة
let CART = [];

// إضافة للسلة
window.addToCart = function(productId) {
  const product = ALL_PRODUCTS.find(p => p.id === productId);

  if (!product) return;

  CART.push(product);

  alert("تمت إضافة المنتج للسلة 🛒");
};

// إرسال الطلب
export async function checkout() {
  if (CART.length === 0) {
    alert("السلة فارغة");
    return;
  }

  const order = {
    items: CART,
    total: CART.reduce((sum, item) => sum + (item.price || 0), 0)
  };

  const res = await apiPost("orders", order);

  if (res) {
    alert("تم إنشاء الطلب بنجاح");
    CART = [];
  } else {
    alert("فشل الطلب");
  }
}
