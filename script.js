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

function safeGif(src){
  // If your local gif path is wrong, it will fall back to an online gif
  gif.onerror = () => {
    gif.onerror = null;
    gif.src = "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif";
  };
  gif.src = src;
}

function moveNoButtonSafe() {
  const rect = noBtn.getBoundingClientRect();
  const padding = 12;

  // keep inside screen + avoid topbar area
  const maxX = window.innerWidth - rect.width - padding;
  const maxY = window.innerHeight - rect.height - padding;

  const x = clamp(Math.random() * maxX, padding, maxX);
  const y = clamp(Math.random() * maxY, padding + 90, maxY);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function startMusic() {
  if (!music) return;
  music.volume = parseFloat(volume.value || "0.6");
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
  if (music) music.volume = parseFloat(volume.value);
});

// Copy link
shareBtn.addEventListener("click", async () => {
  const url = window.location.href;
  const text = `Zehra Haque 😭❤️ please answer this: ${url}`;
  try {
    await navigator.clipboard.writeText(text);
    subline.textContent = "Copied ✅ Now send it to Zehra 😄";
  } catch {
    subline.textContent = "Copy failed 😅 Try manual copy.";
  }
});

// WhatsApp
waBtn.addEventListener("click", () => {
  const url = window.location.href;
  const msg = `Zehra Haque 😭❤️ please answer this: ${url}`;
  const waLink = `https://wa.me/?text=${encodeURIComponent(msg)}`;
  window.open(waLink, "_blank");
});

// No button
noBtn.addEventListener("click", () => {
  question.textContent = messages[Math.min(noClickCount, messages.length - 1)];
  noClickCount++;
  updateProgress();

  // Grow yes button (smooth)
  const currentSize = parseFloat(getComputedStyle(yesBtn).fontSize);
  yesBtn.style.fontSize = (currentSize + 6) + "px";
  yesBtn.style.padding = "14px 28px";

  // Swap gifs (safe fallback)
  if (noClickCount >= 6) safeGif("images/cry.gif");
  else if (noClickCount >= 3) safeGif("images/sad.gif");
  else safeGif("images/start.gif");

  moveNoButtonSafe();
});

noBtn.addEventListener("mouseenter", () => {
  if (noClickCount >= 3) moveNoButtonSafe();
});

// Yes -> celebration page
yesBtn.addEventListener("click", () => {
  window.location.href = "yes.html";
});

// initial
updateProgress();
safeGif("images
