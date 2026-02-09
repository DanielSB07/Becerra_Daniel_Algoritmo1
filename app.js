document.addEventListener("DOMContentLoaded", () => {

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

  const tipoSelect = document.getElementById("tipoSelect");
  const contextoSelect = document.getElementById("contextoSelect");
  const questionEl = document.getElementById("question");

  const labelA = document.getElementById("labelA");
  const labelB = document.getElementById("labelB");
  const btnA = document.getElementById("btnA");
  const btnB = document.getElementById("btnB");
  const btnNew = document.getElementById("btnNew");
  const btnTop = document.getElementById("btnTop");
  const btnReset = document.getElementById("btnReset");
  const topBox = document.getElementById("topBox");

  const state = {};

  function bucketKey() {
    return `${tipoSelect.value}__${contextoSelect.value}`;
  }

  function getBucket() {
    const key = bucketKey();
    if (!state[key]) {
      state[key] = {};
      equipos.forEach(e => state[key][e] = RATING_INICIAL);
    }
    return state[key];
  }

  function expectedScore(ra, rb) {
    return 1 / (1 + Math.pow(10, (rb - ra) / 400));
  }

  function updateElo(a, b, winner) {
    const bucket = getBucket();
    const ra = bucket[a];
    const rb = bucket[b];

    const ea = expectedScore(ra, rb);
    const eb = expectedScore(rb, ra);

    bucket[a] = ra + K * ((winner === "A" ? 1 : 0) - ea);
    bucket[b] = rb + K * ((winner === "B" ? 1 : 0) - eb);
  }

  let currentA, currentB;

  function newDuel() {
    currentA = equipos[Math.floor(Math.random() * equipos.length)];
    do {
      currentB = equipos[Math.floor(Math.random() * equipos.length)];
    } while (currentA === currentB);

    labelA.textContent = currentA;
    labelB.textContent = currentB;
    questionEl.textContent = contextoSelect.options[contextoSelect.selectedIndex].text;
  }

  function renderTop() {
    const bucket = getBucket();
    const arr = Object.entries(bucket)
      .map(([equipo, rating]) => ({ equipo, rating }))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10);

    topBox.innerHTML = arr.map((e, i) => `
      <div class="toprow">
        <div><b>${i + 1}.</b> ${e.equipo}</div>
        <div>${e.rating.toFixed(1)}</div>
      </div>
    `).join("");
  }

  btnA.onclick = () => { updateElo(currentA, currentB, "A"); newDuel(); };
  btnB.onclick = () => { updateElo(currentA, currentB, "B"); newDuel(); };
  btnNew.onclick = newDuel;
  btnTop.onclick = renderTop;

  btnReset.onclick = () => {
    const key = bucketKey();
    delete state[key];
    renderTop();
    newDuel();
  };

  tipoSelect.onchange = () => { renderTop(); };
  contextoSelect.onchange = () => { newDuel(); renderTop(); };

  newDuel();
  renderTop();
});
