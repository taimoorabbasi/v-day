// Confetti effect
function createConfetti() {
  const confetti = document.createElement("div");
  confetti.style.position = "fixed";
  confetti.style.width = "8px";
  confetti.style.height = "8px";
  confetti.style.backgroundColor =
    "hsl(" + Math.random() * 360 + ", 100%, 50%)";
  confetti.style.top = "-10px";
  confetti.style.left = Math.random() * window.innerWidth + "px";
  confetti.style.zIndex = 9999;
  document.body.appendChild(confetti);

  let fall = setInterval(() => {
    confetti.style.top =
      parseInt(confetti.style.top) + 5 + "px";

    if (parseInt(confetti.style.top) > window.innerHeight) {
      clearInterval(fall);
      confetti.remove();
    }
  }, 20);
}

setInterval(createConfetti, 120);

// Floating hearts
function createHeart(){
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (Math.random()*3 + 3) + "s";
  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

setInterval(createHeart, 600);
