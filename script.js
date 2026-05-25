const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// ship position and angle
const ship = {
  x: 400,
  y: 300,
  angle: -Math.PI / 2  
};

//triangle
function drawShip() {
  ctx.save();

  ctx.translate(ship.x, ship.y);  
  ctx.rotate(ship.angle);          

  ctx.beginPath();
  ctx.moveTo(20, 0);     
  ctx.lineTo(-15, -12);  
  ctx.lineTo(-15, 12);   
  ctx.closePath();

  ctx.stroke();
  ctx.restore();
}

function gameLoop() {
  ctx.clearRect(0, 0, 800, 600);
  drawShip();
  requestAnimationFrame(gameLoop);
}

gameLoop();   