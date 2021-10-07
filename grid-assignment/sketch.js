// Escape Room

let ground, spriteWidth, spriteHeight, spriteFront, spriteBack, spriteLeft, spriteRight;

let spritePosition = "back";

let state = "start";

let cellSize;
let gridSize = 4;
let grid;
let playerX = 10;
let playerY = 10;
let speed = 5;
let newPlayerX = 10;
let newPlayerY = 10;

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
  characterMovement();
}

/////////////////// game state //////////////////////////////

function gameState() {
  if (state === "start") {
    displayGrid();
    displayCharacter();
    characterMovement();
  }
}


////////////////// display functions /////////////////////////////////

function displayCharacter() {
  image(spriteFront, playerY, playerX, spriteWidth, spriteHeight);
}

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

function characterMovement() {
  if (keyIsDown(87)){ //w
    playerY -= speed;
    image(spriteBack, playerX, playerY, spriteWidth, spriteHeight);
    spritePosition = "forward";
  }
  else if (keyIsDown(83)){ //s
    playerY += speed;
    image(spriteFront, playerX, playerY, spriteWidth, spriteHeight);
    spritePosition = "back";
  }
  else if (keyIsDown(65)){ //a
    playerX -= speed;
    image(spriteLeft, playerX, playerY, spriteWidth, spriteHeight);
    spritePosition = "left";
  }
  else if (keyIsDown(68)){ //d
    playerX += speed;
    image(spriteRight, playerX, playerY, spriteWidth, spriteHeight);
    spritePosition = "right";
  }
  else {
    keyReleased();
  }
}

function keyReleased() {
  if (spritePosition === "forward") {
    image(spriteBack, playerX, playerY, spriteWidth, spriteHeight);
  }
  else if (spritePosition === "back") {
    image(spriteFront, playerX, playerY, spriteWidth, spriteHeight);
  }
  else if (spritePosition === "left") {
    image(spriteLeft, playerX, playerY, spriteWidth, spriteHeight);
  }
  else if (spritePosition === "right") {
    image(spriteRight, playerX, playerY, spriteWidth, spriteHeight);
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