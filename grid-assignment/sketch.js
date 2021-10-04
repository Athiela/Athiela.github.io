// Escape Room

let ground, spriteFront, spriteBack, spriteLeft, spriteRight;

let cellSize;
let gridSize = 4;
let grid;
let playerX = 0;
let playerY = 0;

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
  grid[playerX][playerY] = spriteFront;
}

function draw() {
  background(220);
  displayGrid();
  keyPressed();
}

//////////////////////////////////////////////////////////////////////



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

function keyPressed() {
  if (key === "s") {
    image(spriteFront, playerX, playerY, cellSize/2, cellSize/2);
    tryMovingTo(playerX, playerY+1);
  }
  else if (key === "w") {
    image(spriteBack, playerX, playerY, cellSize/2, cellSize/2);
    tryMovingTo(playerX, playerY-1);
  }
  else if (key === "d") {
    image(spriteRight, playerX, playerY, cellSize/2, cellSize/2);
    tryMovingTo(playerX+1, playerY);
  }
  else if (key === "a") {
    image(spriteLeft, playerX, playerY, cellSize/2, cellSize/2);
    tryMovingTo(playerX-1, playerY);
  }
}

function tryMovingTo(newX, newY) {
  // make sure you're on the grid
  if (newX >= 0 && newY >= 0 && newX < gridSize && newY < gridSize) {
    // check if new spot if empty
    if (grid[newY][newX] === 0) {
      grid[playerY][playerX] = 0;
      playerX = newX;
      playerY = newY;
      grid[newY][newX] = spriteFront;
    }
  }
}