const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Size canvas to fit viewport minus the heading
const W = window.innerWidth  - 20;
const H = window.innerHeight - 100;
canvas.width  = W;
canvas.height = H;

const keys = {};
window.addEventListener("keydown", function(e) {
  keys[e.code] = true;
  if (e.code === "Space") { e.preventDefault(); fireBullet(); }
  if (e.code === "Enter" && gameOver) restartGame();
});
window.addEventListener("keyup", function(e) { keys[e.code] = false; });

// ship position and angle
const ship = {
  x: W / 2,
  y: H / 2,
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

  ctx.fillStyle = "#00e5ff";
  ctx.fill();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.5;
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
    if (bullets[i].x < 0 || bullets[i].x > W ||
        bullets[i].y < 0 || bullets[i].y > H) {
      bullets.splice(i, 1);
    }
  }
}

function drawBullets() {
  ctx.fillStyle = "#ffff00";
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

  if (asteroid.x - asteroid.size < 0 || asteroid.x + asteroid.size > W) asteroid.vx *= -1;
  if (asteroid.y - asteroid.size < 0 || asteroid.y + asteroid.size > H) asteroid.vy *= -1;
}

//square
function drawAsteroid() {
  ctx.save();
  ctx.translate(asteroid.x, asteroid.y);
  ctx.rotate(asteroid.angle);

  const s = asteroid.size;
  ctx.beginPath();
  ctx.rect(-s, -s, s * 2, s * 2);

  ctx.fillStyle = "#ff4400";
  ctx.fill();
  ctx.strokeStyle = "#ff9900";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

let score = 0;
let gameOver = false;

//collision
function checkCollision() {
  const s = asteroid.size;
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    if (b.x > asteroid.x - s && b.x < asteroid.x + s &&
        b.y > asteroid.y - s && b.y < asteroid.y + s) {
      bullets.splice(i, 1);
      score += 10;
      asteroid.x = Math.random() * (W - 200) + 100;
      asteroid.y = Math.random() * (H - 200) + 100;
    }
  }

  // asteroid hits ship
  const dx = ship.x - asteroid.x;
  const dy = ship.y - asteroid.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < s + 15) {
    gameOver = true;
  }
}

function drawGameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(0, 0, W, H);

  ctx.textAlign = "center";
  ctx.fillStyle = "#ff4444";
  ctx.font = "bold 52px Arial";
  ctx.fillText("GAME OVER", W / 2, H / 2 - 20);

  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, W / 2, H / 2 + 30);

  ctx.fillStyle = "#aaa";
  ctx.font = "18px Arial";
  ctx.fillText("Press Enter to play again", W / 2, H / 2 + 70);

  ctx.textAlign = "left";
}

function restartGame() {
  score = 0;
  gameOver = false;
  bullets.length = 0;
  ship.x = W / 2;
  ship.y = H / 2;
  ship.angle = -Math.PI / 2;
  asteroid.x = 650;
  asteroid.y = 100;
  asteroid.vx = -1.5;
  asteroid.vy = 1;
  asteroid.angle = 0;
}

function gameLoop() {
  ctx.clearRect(0, 0, W, H);

  if (!gameOver) {
    updateShip();
    updateBullets();
    updateAsteroid();
    checkCollision();
  }

  drawShip();
  drawBullets();
  drawAsteroid();
  ctx.fillStyle = "white";
  ctx.font = "22px Arial";
  ctx.fillText("Score: " + score, 10, 30);

  if (gameOver) drawGameOver();

  requestAnimationFrame(gameLoop);
}

gameLoop();