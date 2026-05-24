const canvas = document.getElementById("game-canvas");
let ctx;

if (canvas.getContext) {
  ctx = canvas.getContext("2d");
} else {
  console.error("Canvas not supported in this browser.");
}

//triangle
const angle = Math.PI / 2;
const centerX = 40;
const centerY = 80;

ctx.clearRect(0, 0, canvas.width, canvas.height);

ctx.save();
ctx.translate(centerX, centerY);
ctx.rotate(angle);

ctx.beginPath();
ctx.moveTo(0, -1);
ctx.lineTo(-50, 30);
ctx.lineTo(50, 30);
ctx.closePath();

ctx.fillStyle = "#ff0000";
ctx.fill();

ctx.lineWidth = 5;
ctx.strokeStyle = "#000000";
ctx.stroke();

ctx.restore();