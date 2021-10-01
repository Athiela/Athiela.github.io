// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridSize = 8;
let grid;
let speed = 3;
let playerX = 0;
let playerY = 0;

function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
  grid = createEmptyGrid(gridSize);
}

function draw() {
  background(220);
  displayGrid();
}

function displayGrid() {
  let cellSize = width/gridSize;
  for (let y=0; y<grid.length; y++) {
    for (let x=0; x<grid[y].length; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
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

function handleKeys() {
  if (keyIsDown(87)){ //w
    playerY -= speed;
  }
  if (keyIsDown(83)){ //s
    playerY += speed;
  }
  if (keyIsDown(65)){ //a
    playerX -= speed;
  }
  if (keyIsDown(68)){ //d
    playerX += speed;
  }
}
