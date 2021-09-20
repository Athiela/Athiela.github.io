// Ball scene

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i=0; i <1 ; i++) {
    spawnBall();
  }
  window.setInterval(spawnBall, 500);
}

function draw() {
  background(220);
  displayBall();
  moveBall();
}

function mousePressed() {
  spawnBall();
  ballArray[ballArray.length-1].x = mouseX;
  ballArray[ballArray.length-1].y = mouseY;
}

function spawnBall() {
  let newBall = {
    x: random(width),
    y: random(height),
    radius: random(10, 30),
    ballColor: color(random(255), random(255), random(255), random(255)),
    dx: random(0, 20),
    dy: random(0, 20),
  };
  ballArray.push(newBall);
}

function displayBall() {
  for (let ball of ballArray) {
    fill(ball.ballColor);
    circle(ball.x, ball.y, ball.radius*2);
    noStroke();
  }
}

function moveBall() {
  for (let theBall of ballArray) {
    theBall.x += theBall.dx;
    theBall.y += theBall.dy;
    theBall.dx = random(-5, 5);
    theBall.dy = random(-5, 5); 
  }
}


