/* =========================
   REVEAL ANIMATION
========================= */

const reveals = document.querySelectorAll(".reveal");

function revealSections() {

  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach(section => {

    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add("active");
    }

  });

}

window.addEventListener("scroll", revealSections);

revealSections();


/* =========================
   SCRATCH CARD
========================= */

const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;

/* TAMANHO */

function resizeCanvas() {

  const card = document.querySelector(".scratch-card");

  canvas.width = card.offsetWidth;
  canvas.height = card.offsetHeight;

  createScratchLayer();
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

/* CAMADA PARA RASPAR */

function createScratchLayer() {

  /* FUNDO */

  const gradient = ctx.createLinearGradient(
    0,
    0,
    canvas.width,
    canvas.height
  );

  gradient.addColorStop(0, "#ff1744");
  gradient.addColorStop(1, "#0066ff");

  ctx.globalCompositeOperation = "source-over";

  ctx.fillStyle = gradient;

  ctx.fillRect(0, 0, canvas.width, canvas.height);

  /* TEXTO */

  ctx.fillStyle = "white";

  ctx.font = "bold 32px Poppins";

  ctx.textAlign = "center";

  ctx.fillText(
    "RASPE AQUI",
    canvas.width / 2,
    canvas.height / 2
  );

  ctx.font = "18px Poppins";

  ctx.fillText(
    "revele seu presente",
    canvas.width / 2,
    canvas.height / 2 + 40
  );
}

/* COMEÇAR */

function startPosition(e) {

  isDrawing = true;

  scratch(e);
}

/* PARAR */

function endPosition() {

  isDrawing = false;

  ctx.beginPath();
}

/* RASPAR */

function scratch(e) {

  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();

  let x;
  let y;

  if (e.touches) {

    x = e.touches[0].clientX - rect.left;
    y = e.touches[0].clientY - rect.top;

  } else {

    x = e.clientX - rect.left;
    y = e.clientY - rect.top;

  }

  ctx.globalCompositeOperation = "destination-out";

  ctx.beginPath();

  ctx.arc(x, y, 35, 0, Math.PI * 2);

  ctx.fill();
}

/* MOUSE */

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", scratch);

/* TOUCH */

canvas.addEventListener("touchstart", startPosition);
canvas.addEventListener("touchend", endPosition);
canvas.addEventListener("touchmove", scratch);

/* EVITAR SCROLL NO TOUCH */

canvas.addEventListener("touchmove", function(e) {
  e.preventDefault();
}, { passive: false });