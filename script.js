const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");
const subline = document.getElementById("subline");
const gif = document.getElementById("gif");

const music = document.getElementById("bgMusic");
const progressEl = document.getElementById("progress");

const musicBtn = document.getElementById("musicBtn");
const volume = document.getElementById("volume");
const shareBtn = document.getElementById("shareBtn");
const waBtn = document.getElementById("waBtn");

const NAME = "Zehra Haque";

let noClickCount = 0;
let musicStarted = false;

const messages = [
  `Are you sure, ${NAME}? 🥺`,
  "Really sure? 😢",
  "Think again 💔",
  "Don’t break my heart 😭",
  "Last chance 😭😭",
  "Zehraaaa 😭❤️",
  "I’m not giving up 😤",
  "Fine… I’ll make it impossible 😈"
];

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function updateProgress() {
  const pct = clamp((noClickCount / 8) * 100, 0, 100);
  if (progressEl) progressEl.style.width = `${pct}%`;
}

function moveNoButtonSafe() {
  const btnRect = noBtn.getBoundingClientRect();
  const padding = 12;

  const maxX = window.innerWidth - btnRect.width - padding;
  const maxY = window.innerHeight - btnRect.height - padding;

  const x = clamp(Math.random() * maxX, padding, maxX);
  const y = clamp(Math.random() * maxY, padding + 70, maxY);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function startMusic() {
  music.volume = parseFloat(volume.value);
  music.play().then(() => {
    musicStarted = true;
    musicBtn.textContent = "Pause ⏸️";
  }).catch(() => {});
}

document.body.addEventListener("click", () => {
  if (!musicStarted) startMusic();
}, { once: true });

musicBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!musicStarted) return startMusic();
  if (music.paused) {
    music.play();
    musicBtn.textContent = "Pause ⏸️";
  } else {
    music.pause();
    musicBtn.textContent = "Play 🎵";
  }
});

volume.addEventListener("input", () => {
  music.volume = parseFloat(volume.value);
});

shareBtn.addEventListener("click", async () => {
  const url = window.location.href;
  const text = `Zehra Haque 😭❤️ please answer this: ${url}`;
  await navigator.clipboard.writeText(text);
  alert("Copied! Send it to Zehra 😄");
});

waBtn.addEventListener("click", () => {
  const url = window.location.href;
  const msg = `Zehra Haque 😭❤️ please answer this: ${url}`;
  const waLink = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  window.open(waLink, "_blank");
});

noBtn.addEventListener("click", () => {
  question.textContent = messages[Math.min(noClickCount, messages.length - 1)];
  noClickCount++;
  updateProgress();

  const currentSize = parseFloat(getComputedStyle(yesBtn).fontSize);
  yesBtn.style.fontSize = (currentSize + 6) + "px";

  if (noClickCount >= 3) gif.src = "images/sad.gif";
  if (noClickCount >= 6) gif.src = "images/cry.gif";

  moveNoButtonSafe();
});

noBtn.addEventListener("mouseenter", () => {
  if (noClickCount >= 3) moveNoButtonSafe();
});

yesBtn.addEventListener("click", () => {
  window.location.href = "yes.html";
});
