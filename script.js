const canvas = document.getElementById("game-canvas");
let ctx;

if (canvas.getContext) {
  ctx = canvas.getContext("2d");
} else {
  console.error("Canvas not supported in this browser.");
}

function draw() {
  ctx.fillStyle = "rgb(200 0 0)";
  ctx.fillRect(10, 10, 50, 50);

  ctx.fillStyle = "rgb(0 0 200 / 50%)";
  ctx.fillRect(30, 30, 50, 50);
}

draw();
