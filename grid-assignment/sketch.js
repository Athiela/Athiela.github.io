// Escape Room

let ground, spriteWidth, spriteHeight, spriteFront, spriteBack, spriteLeft, spriteRight, spritePosition;

let state = "start";

let cellSize;
let gridSize = 4;
let grid;
let playerX = 10;
let playerY = 10;
let speed = 5;

function preload() {
  ground = loadImage("assets/floor.png");
  spriteFront = loadImage("assets/spriteFront.png");
  spriteBack = loadImage("assets/spriteBack.png");
  spriteLeft = loadImage("assets/spriteLeft.png");
  spriteRight = loadImage("assets/spriteRight.png");
}

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }

  grid = createEmptyGrid(gridSize);
  cellSize = width/gridSize;

  spriteWidth = width/8;
  spriteHeight = height/8;
}

function draw() {
  background(220);
  displayGrid();
  // characterMovement();
  keyPressed();
}

/////////////////// game state //////////////////////////////

function gameState() {
  if (state === "start") {
    displayGrid();
    // characterMovement();
    keyPressed();
  }
  else if (state === "play") {
    displayGrid();
    // characterMovement();
    keyPressed();
  }
}

////////////////// display functions /////////////////////////////////

function displayGrid() {
  for (let y=0; y<grid.length; y++) {
    for (let x=0; x<grid[y].length; x++) {
      image(ground, x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

function createEmptyGrid(howLarge) {
  let emptyArray = [];
  for (let y=0; y<howLarge; y++) {
    emptyArray.push([]);
    for (let x=0; x<howLarge; x++) {
      emptyArray[y].push(0);
    }
  }
  return emptyArray;
}

//////////////////// character movement ///////////////////////////////

// function characterMovement() {
//   if (keyIsDown(87)){ //w
//     image(spriteBack, playerY, playerX, spriteWidth, spriteHeight);
//     playerY -= speed;
//   }
//   if (keyIsDown(83)){ //s
//     image(spriteFront, playerY, playerX, spriteWidth, spriteHeight);
//     playerY += speed;
//   }
//   if (keyIsDown(65)){ //a
//     image(spriteLeft, playerY, playerX, spriteWidth, spriteHeight);
//     playerX -= speed;
//   }
//   if (keyIsDown(68)){ //d
//     image(spriteRight, playerY, playerX, spriteWidth, spriteHeight);
//     playerX += speed;
//   }
// }

function keyPressed() {
  if (key === "s") {
    playerY += playerY+cellSize;
    image(spriteFront, playerY, playerX, spriteWidth, spriteHeight);
  }
  else if (key === "w") {
    playerY += playerY-cellSize;
    image(spriteBack, playerY, playerX, spriteWidth, spriteHeight);
  }
  else if (key === "d") {
    playerX += playerX+cellSize;
    image(spriteRight, playerY, playerX, spriteWidth, spriteHeight);
  }
  else if (key === "a") {
    playerX += playerX-cellSize;
    image(spriteLeft, playerY, playerX, spriteWidth, spriteHeight);
  }
}

// function tryMovingTo(newX, newY) {
//   // make sure you're on the grid
//   if (newX >= 0 && newY >= 0 && newX < gridSize && newY < gridSize) {
//     // check if new spot if empty
//     if (grid[newY][newX] === 0) {
//       grid[playerY][playerX] = 0;
//       playerX = newX;
//       playerY = newY;
//       grid[newY][newX] = spritePosition;
//     }
//   }
// }