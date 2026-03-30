// pages/bitcoin.js

import { MIX_API_BASE } from "../config/api.js";

export function loadBitcoinPage(app) {
  const container = document.createElement("div");
  container.className = "bitcoin-container";

  const title = document.createElement("h2");
  title.textContent = "سعر البتكوين - Bitcoin";

  const priceBox = document.createElement("div");
  priceBox.id = "btc-price";
  priceBox.textContent = "جاري جلب البيانات...";

  const chartBox = document.createElement("canvas");
  chartBox.id = "btc-chart";
  chartBox.width = 400;
  chartBox.height = 200;

  container.appendChild(title);
  container.appendChild(priceBox);
  container.appendChild(chartBox);
  app.innerHTML = "";
  app.appendChild(container);

  // جلب بيانات البيتكوين من API خارجي
  async function fetchBitcoinData() {
    try {
      const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
      const data = await res.json();
      const price = data.bitcoin.usd;

      priceBox.textContent = السعر الحالي: $${price.toLocaleString()}`;

      return price;
    } catch (err) {
      console.error("Bitcoin API Error:", err);
      priceBox.textContent = "خطأ في جلب البيانات";
      return null;
    }
  }

  // 📈 رسم بياني باستخدام Chart.js
  async function renderChart() {
    const ChartModule = await import("https://cdn.jsdelivr.net/npm/chart.js@4.3.0/dist/chart.min.js");

    const ctx = chartBox.getContext("2d");
    const labels = [];
    const prices = [];

    // تحديث البيانات كل 5 ثواني (50 ثانية = 10 نقاط)
    async function update() {
      const price = await fetchBitcoinData();
      if (price !== null) {
        const now = new Date();
        labels.push(now.toLocaleTimeString());
        prices.push(price);

        if (labels.length > 10) {
          labels.shift();
          prices.shift();
        }

        new ChartModule.Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [{
              label: "سعر البتكوين USD",
              data: prices,
              borderColor: "#f7931a",
              backgroundColor: "rgba(247, 147, 26, 0.2)",
              fill: true,
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: false
              }
            }
          }
        });
      }
    }

    update();
    setInterval(update, 5000);
  }

  renderChart();
                              }
