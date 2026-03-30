// pages/games.js

import { apiFetch } from "../config/api.js";

export function loadGames(app) {
  // الحاوية الرئيسية
  const container = document.createElement("div");
  container.className = "games-container";

  // عنوان القسم
  const title = document.createElement("h2");
  title.textContent = "ألعاب منصة Mix";

  // منطقة عرض الألعاب
  const gamesList = document.createElement("div");
  gamesList.id = "games-list";
  gamesList.style.display = "grid";
  gamesList.style.gridTemplateColumns = "repeat(auto-fit, minmax(150px, 1fr))";
  gamesList.style.gap = "15px";
  gamesList.style.padding = "10px";

  // إضافة العناصر للحاوية
  container.appendChild(title);
  container.appendChild(gamesList);
  app.innerHTML = "";
  app.appendChild(container);

  // جلب قائمة الألعاب من API
  updateGamesList(gamesList);
}

// دالة تحديث قائمة الألعاب
async function updateGamesList(gamesList) {
  try {
    const data = await apiFetch("games"); // endpoint من منصة Mix

    if (!data || data.length === 0) {
      gamesList.innerHTML = "<p> لا توجد ألعاب حالياً</p>";
      return;
    }

    // عرض الألعاب
    gamesList.innerHTML = "";
    data.forEach(game => {
      const gameCard = document.createElement("div");
      gameCard.className = "game-card";
      gameCard.style.padding = "10px";
      gameCard.style.background = "#1a1a1a";
      gameCard.style.color = "#fff";
      gameCard.style.borderRadius = "8px";
      gameCard.style.textAlign = "center";
      gameCard.style.cursor = "pointer";
      gameCard.style.transition = "0.3s";

      gameCard.innerHTML = `
        <img src="${game.icon || 'assets/games/default.png'}" alt="${game.name}" style="width:80px;height:80px;margin-bottom:5px;">
        <h4>${game.name}</h4>
        <p style="font-size:12px">${game.description || ""}</p>
      `;

      // عند الضغط على اللعبة
      gameCard.addEventListener("click", () => {
        if (game.url) {
          window.open(game.url, "_blank"); // فتح اللعبة في نافذة جديدة
        } else {
          alert("اللعبة غير متاحة حالياً");
        }
      });

      gamesList.appendChild(gameCard);
    });

  } catch (error) {
    console.error("Games API Error:", error);
    gamesList.innerHTML = "<p> خطأ في تحميل الألعاب</p>";
  }
}
