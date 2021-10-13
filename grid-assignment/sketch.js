// Escape Room

///////////////////////// Global variables ////////////////////////////////////////

// start menu variables
let title, startButton, hoverStartButton;

let xPlayButton, yPlayButton, playButtonHeight, playButtonWidth;

// end menu variables, not yet in 
let youWin, pressEnter;

// sprite variables
let spriteWidth, spriteHeight, spriteFront, spriteBack, spriteLeft, spriteRight;
let spritePosition = "back";

// tile variables
let ground, wall, door, poster, room, boxes;

// furniture variables, not yet in 
let chest, bed, cage, rug;

// state variable
let state = "start";

// grid variables
let cellSize, grid;
let gridDimensions = 6;
let playerX = 150;
let playerY = 150;
let speed = 5;

///////////////////////// Setup and preload ////////////////////////////////////////

function preload() {

  // start preload
  title = loadImage("assets/startTitle.png");
  startButton = loadImage("assets/playButton.png");
  hoverStartButton = loadImage("assets/hoverPlayButton.png");

  // tile preload
  ground = loadImage("assets/floor.png");
  wall = loadImage("assets/wall.png");

  // sprite image preload
  spriteFront = loadImage("assets/spriteFront.png");
  spriteBack = loadImage("assets/spriteBack.png");
  spriteLeft = loadImage("assets/spriteLeft.png");
  spriteRight = loadImage("assets/spriteRight.png");

  // level preload
  room = loadStrings("assets/escape-room.txt");
}

function setup() {
  createCanvas(800, 800);

  // cell setup
  grid = room;
  cellSize = width/gridDimensions;

  // sprite setup
  spriteWidth = 100;
  spriteHeight = 100;

  // button setup
  xPlayButton = width/2;
  yPlayButton = height/2;
  playButtonWidth = 350;
  playButtonHeight = 150;
}

function draw() {
  background(220);
  gameState();
}

/////////////////// game state //////////////////////////////

function gameState() {
  if (state === "start") {
    background(100);
    hoverStartButtons();
    pressPlay();

    image(title, width/2, 200, 350, 200);

  }
  if (state === "play") {
    displayGrid();
    characterMovement();
  }
}


////////////////// display functions /////////////////////////////////

function displayGrid() {
  for (let y=0; y<gridDimensions; y++) {
    for (let x=0; x<gridDimensions; x++) {
      if (grid[y][x] === "1") {
        image(wall, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      if (grid[y][x] === "0") {
        image(ground, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      // door, not yet in
      if (grid[y][x] === "2") {
        image(door, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      // bed, not yet in
      if (grid[y][x] === "3") {
        image(door, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      // cage, not yet in
      if (grid[y][x] === "4") {
        image(cage, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      // chest, not yet in
      if (grid[y][x] === "5") {
        image(chest, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      // rug, not yet in
      if (grid[y][x] === "6") {
        image(rug, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      // boxes, not yet in
      if (grid[y][x] === "7") {
        image(boxes, x*cellSize, y*cellSize, cellSize, cellSize);
      }
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

///////////////////////// Button hover and press /////////////////////////////////////////

function hoverStartButtons() {
  if (mouseX > xPlayButton - playButtonWidth/2 && mouseX < xPlayButton + playButtonWidth/2 && mouseY > yPlayButton - playButtonHeight/2 && mouseY < yPlayButton + playButtonHeight/2) {
    image(hoverStartButton, xPlayButton, yPlayButton, playButtonWidth, playButtonHeight);
  }
  else {
    image(startButton, xPlayButton, yPlayButton, playButtonWidth, playButtonHeight);
  }
}

function pressPlay() {
  if (mouseX > xPlayButton - playButtonWidth/2 && mouseX < xPlayButton + playButtonWidth/2 && mouseY > yPlayButton - playButtonHeight/2 && mouseY < yPlayButton + playButtonHeight/2 && mouseIsPressed) {
    state = "play";
  }
}