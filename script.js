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


//asteroid
const asteroid = {
  x: 650,
  y: 100,
  size: 30,
  vx: -1.5,
  vy: 1,
  angle: 0
};

function updateAsteroid() {
  asteroid.x += asteroid.vx;
  asteroid.y += asteroid.vy;
  asteroid.angle += 0.02;

  if (asteroid.x - asteroid.size < 0 || asteroid.x + asteroid.size > 800) asteroid.vx *= -1;
  if (asteroid.y - asteroid.size < 0 || asteroid.y + asteroid.size > 600) asteroid.vy *= -1;
}

//square
function drawAsteroid() {
  ctx.save();
  ctx.translate(asteroid.x, asteroid.y);
  ctx.rotate(asteroid.angle);

  const s = asteroid.size;
  ctx.beginPath();
  ctx.rect(-s, -s, s * 2, s * 2);

  ctx.stroke();
  ctx.restore();
}

function gameLoop() {
  ctx.clearRect(0, 0, 800, 600);
  updateShip();
  updateAsteroid();
  drawShip();
  drawAsteroid();
  requestAnimationFrame(gameLoop);
}

gameLoop();