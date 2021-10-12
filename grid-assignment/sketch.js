// Escape Room

///////////////////////// Global variables ////////////////////////////////////////

// start menu variables
let title, startButton, hoverStartButton;

let xPlayButton, yPlayButton, playButtonHeight, playButtonWidth;

// sprite variables
let spriteWidth, spriteHeight, spriteFront, spriteBack, spriteLeft, spriteRight;
let spritePosition = "back";

// tile variables
let ground, wall, door, poster, room;

// furniture variables
let chest, bed, cage;

// state variable
let state = "start";

// grid variables
let cellWide, cellHigh, cellWidth, cellHeight;
let grid;
let playerX = 100;
let playerY = 100;
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
  imageMode(CENTER);
  createCanvas(800, 800);

  // cell setup
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
  for (let y=0; y<cellHigh; y++) {
    for (let x=0; x<cellWide; x++) {
      image(wall, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
      // showCell(grid[y][x], x, y);
    }
  }
}

function createEmptyGrid(cols, rows) {
  let rows = grid.length;
  let cols = grid[0].length;
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
  if (whichCell === "1") {
    image(wall, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
  }
  else {
    image(ground, x*cellWidth, y*cellHeight, cellWidth, cellHeight);
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