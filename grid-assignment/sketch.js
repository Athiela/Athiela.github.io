// Escape Room

let spriteWidth, spriteHeight, spriteFront, spriteBack, spriteLeft, spriteRight;

let ground, wall, room;

let spritePosition = "back";

let state = "start";

let cellWide, cellHigh, cellWidth, cellHeight;
let grid;
let playerX = 10;
let playerY = 10;
let speed = 5;

function preload() {
  ground = loadImage("assets/floor.png");
  wall = loadImage("assets/wall.png");

  spriteFront = loadImage("assets/spriteFront.png");
  spriteBack = loadImage("assets/spriteBack.png");
  spriteLeft = loadImage("assets/spriteLeft.png");
  spriteRight = loadImage("assets/spriteRight.png");

  room = loadStrings("assets/escape-room.txt");
}

function setup() {
  createCanvas(800, 800);

  cellWide = room.length;
  cellHigh = room[0].length;
  cellWidth = width/cellWide;
  cellHeight = height/cellHeight;
  grid = createEmptyGrid(cellWide, cellHigh);

  for (let y = 0; y<cellHigh; y++) {
    for (let x = 0; x<cellWide; x++) {
      let cellType = room[y][x];
      grid[y][x] = cellType;
    }
  }
  spriteWidth = width/8;
  spriteHeight = height/8;
}

function draw() {
  background(220);
  gameState();
}

/////////////////// game state //////////////////////////////

function gameState() {
  if (state === "start") {
    displayGrid();
    characterMovement();
  }
}


////////////////// display functions /////////////////////////////////

function displayGrid() {
  for (let y=0; y<cellHigh; y++) {
    for (let x=0; x<cellWide; x++) {
      showCell(grid[y][x], x, y);
    }
  }
}

function createEmptyGrid(cols, rows) {
  let emptyGrid = [];
  for (let y = 0; y<rows; y++) {
    emptyGrid.push([]);
    for (let x = 0; x<cols; x++) {
      emptyGrid[y].push(0);
    }
  }
  return emptyGrid;
}

function showCell(whichCell, x, y) {
  if (whichCell === "0") {
    image(ground, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
  }
  else if (whichCell === "1") {
    image(wall, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
  }
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



