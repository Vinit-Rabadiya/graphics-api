const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const keys = {};
window.addEventListener("keydown", function(e) { keys[e.code] = true; });
window.addEventListener("keyup",   function(e) { keys[e.code] = false; });

// ship position and angle
const ship = {
  x: 400,
  y: 300,
  angle: -Math.PI / 2  
};

//moving ship with keys
function updateShip() {
  if (keys["ArrowLeft"])  ship.angle -= 0.05;  
  if (keys["ArrowRight"]) ship.angle += 0.05;   
  if (keys["ArrowUp"]) {                        
    ship.x += Math.cos(ship.angle) * 3;
    ship.y += Math.sin(ship.angle) * 3;
  }
}

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
  updateShip();
  drawShip();
  requestAnimationFrame(gameLoop);
}

gameLoop();