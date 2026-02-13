const music = document.getElementById("celebrateMusic");
const replayBtn = document.getElementById("replayBtn");
const happyGif = document.getElementById("happyGif");

function startMusic(){
  if (!music) return;
  music.volume = 0.7;
  music.play().catch(() => {});
}

document.body.addEventListener("click", startMusic, { once: true });

// Fallback if happy.gif missing
happyGif.onerror = () => {
  happyGif.onerror = null;
  happyGif.src = "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif";
};

// Confetti
function createConfetti() {
  const c = document.createElement("div");
  c.style.position = "fixed";
  c.style.width = "9px";
  c.style.height = "9px";
  c.style.backgroundColor = `hsl(${Math.random()*360},100%,55%)`;
  c.style.top = "-12px";
  c.style.left = Math.random() * window.innerWidth + "px";
  c.style.borderRadius = "3px";
  c.style.opacity = String(Math.random());
  c.style.zIndex = 9999;
  document.body.appendChild(c);

  let y = -12;
  const drift = (Math.random() - 0.5) * 2.5;

  const t = setInterval(() => {
    y += 6;
    c.style.top = y + "px";
    c.style.left = (parseFloat(c.style.left) + drift) + "px";
    if (y > window.innerHeight + 20) {
      clearInterval(t);
      c.remove();
    }
  }, 20);
}

setInterval(createConfetti, 140);

replayBtn?.addEventListener("click", () => {
  window.location.href = "index.html";
});
