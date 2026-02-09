alert("app.js SÍ se está ejecutando");

document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // Datos
  // =====================
  const equipos = [
    "Real Madrid",
    "Barcelona",
    "Bayern Múnich",
    "Liverpool",
    "AC Milan",
    "Inter de Milán",
    "Manchester United",
    "Chelsea",
    "Borussia Dortmund",
    "Paris Saint-Germain"
  ];

  const RATING_INICIAL = 1000;
  const K = 32;

  // =====================
  // Estado
  // =====================
  let ratings = {};
  equipos.forEach(e => ratings[e] = RATING_INICIAL);

  // =====================
  // Elo
  // =====================
  function expectedScore(ra, rb) {
    return 1 / (1 + Math.pow(10, (rb - ra) / 400));
  }

  function updateElo(a, b, winner) {
    const ra = ratings[a];
    const rb = ratings[b];

    const ea = expectedScore(ra, rb);
    const eb = expectedScore(rb, ra);

    const sa = winner === "A" ? 1 : 0;
    const sb = winner === "B" ? 1 : 0;

    ratings[a] = ra + K * (sa - ea);
    ratings[b] = rb + K * (sb - eb);
  }

  // =====================
  // UI
  // =====================
  const labelA = document.getElementById("labelA");
  const labelB = document.getElementById("labelB");
  const btnA = document.getElementById("btnA");
  const btnB = document.getElementById("btnB");
  const btnTop = document.getElementById("btnTop");
  const btnNew = document.getElementById("btnNew");
  const topBox = document.getElementById("topBox");

  let currentA, currentB;

  function randomPair() {
    currentA = equipos[Math.floor(Math.random() * equipos.length)];
    do {
      currentB = equipos[Math.floor(Math.random() * equipos.length)];
    } while (currentA === currentB);

    labelA.textContent = currentA;
    labelB.textContent = currentB;
  }

  function renderTop() {
    const arr = Object.entries(ratings)
      .map(([equipo, rating]) => ({ equipo, rating }))
      .sort((a, b) => b.rating - a.rating);

    topBox.innerHTML = arr.map((e, i) => `
      <div class="toprow">
        <div><b>${i + 1}.</b> ${e.equipo}</div>
        <div>${e.rating.toFixed(1)}</div>
      </div>
    `).join("");
  }

  btnA.addEventListener("click", () => {
    updateElo(currentA, currentB, "A");
    randomPair();
  });

  btnB.addEventListener("click", () => {
    updateElo(currentA, currentB, "B");
    randomPair();
  });

  btnTop.addEventListener("click", renderTop);
  btnNew.addEventListener("click", randomPair);

  // Init
  randomPair();
  renderTop();

});
