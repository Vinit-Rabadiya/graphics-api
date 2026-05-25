const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const keys = {};
window.addEventListener("keydown", function(e) {
  keys[e.code] = true;
  if (e.code === "Space") { e.preventDefault(); fireBullet(); }
});
window.addEventListener("keyup", function(e) { keys[e.code] = false; });

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


//bullets
const bullets = [];

function fireBullet() {
  bullets.push({
    x:  ship.x + Math.cos(ship.angle) * 20,
    y:  ship.y + Math.sin(ship.angle) * 20,
    vx: Math.cos(ship.angle) * 8,
    vy: Math.sin(ship.angle) * 8
  });
}

function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].x += bullets[i].vx;
    bullets[i].y += bullets[i].vy;
    if (bullets[i].x < 0 || bullets[i].x > 800 ||
        bullets[i].y < 0 || bullets[i].y > 600) {
      bullets.splice(i, 1);
    }
  }
}

function drawBullets() {
  for (let i = 0; i < bullets.length; i++) {
    ctx.beginPath();
    ctx.arc(bullets[i].x, bullets[i].y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
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

//collision
function checkCollision() {
  const s = asteroid.size;
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    if (b.x > asteroid.x - s && b.x < asteroid.x + s &&
        b.y > asteroid.y - s && b.y < asteroid.y + s) {
      bullets.splice(i, 1);
      asteroid.x = Math.random() * 600 + 100;
      asteroid.y = Math.random() * 400 + 100;
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, 800, 600);
  updateShip();
  updateBullets();
  updateAsteroid();
  checkCollision();
  drawShip();
  drawBullets();
  drawAsteroid();
  requestAnimationFrame(gameLoop);
}

gameLoop();