// pages/games.js


const link = document.createElement("link");
link.rel = "stylesheet";
link.href = "./pages/games.css";
document.head.appendChild(link);

import { apiFetch } from "../config/api.js";


export function loadGames(app) {
    app.innerHTML = `
        <section id="games">
            <h2>🎮 ألعاب Mix Platform</h2>

            <!-- قائمة الألعاب -->
            <div class="game-list" id="game-list">
                <div class="game-item" id="bitcoin-btn">
                    <h3>💰 لعبة Bitcoin</h3>
                    <p>احصل على أكبر عدد من العملات الافتراضية!</p>
                </div>
            </div>

            <!-- لعبة Bitcoin -->
            <div id="bitcoin-game">
                <canvas id="bitcoin-canvas" width="400" height="300"></canvas>
                <br/>
                <button id="start-bitcoin">ابدأ اللعبة</button>
                <p id="bitcoin-score">النقاط: 0</p>
            </div>
        </section>
    `;

    // ===== إعداد لعبة Bitcoin =====
    const canvas = document.getElementById('bitcoin-canvas');
    const ctx = canvas.getContext('2d');
    let playerX = canvas.width/2;
    let score = 0;
    let coins = [];
    let gameInterval;

    function spawnCoin() {
        coins.push({ x: Math.random()*380, y: 0 });
    }

    function draw() {
        ctx.clearRect(0,0,canvas.width,canvas.height);

        // اللاعب
        ctx.fillStyle = '#007bff';
        ctx.fillRect(playerX, 280, 20, 20);

        // العملات
        ctx.fillStyle = 'gold';
        coins.forEach((coin, i) => {
            coin.y += 2;
            ctx.beginPath();
            ctx.arc(coin.x, coin.y, 10, 0, 2*Math.PI);
            ctx.fill();

            // جمع العملة
            if (coin.y > 270 && coin.x > playerX-10 && coin.x < playerX+20) {
                score += 1;
                coins.splice(i,1);
                document.getElementById('bitcoin-score').innerText = `النقاط: ${score}`;
            }

            // سقوط العملة خارج الشاشة
            if (coin.y > 300) coins.splice(i,1);
        });
    }

    document.getElementById('start-bitcoin').addEventListener('click', () => {
        score = 0;
        coins = [];
        document.getElementById('bitcoin-score').innerText = `النقاط: ${score}`;
        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            draw();
            if (Math.random() < 0.05) spawnCoin();
        }, 20);
    });

    // تحريك اللاعب بالكيبورد
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') playerX -= 10;
        if (e.key === 'ArrowRight') playerX += 10;
        if (playerX < 0) playerX = 0;
        if (playerX > canvas.width-20) playerX = canvas.width-20;
    });

    // ⚡ إرسال النتيجة إلى Backend عند انتهاء اللعبة (اختياري)
    function saveScore(user) {
        fetch('/api/games/bitcoin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, score })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
    }
}
