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

function r
