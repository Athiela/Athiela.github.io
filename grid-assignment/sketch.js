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

// furniture variables
let chest, bed, cage;

// interaction variables
let interact;

// state variables
let state = "play";
let playerState = "move";
let textState = "none";

// grid variables
let cellSize, grid;
let gridDimensions = 6;
let playerX = 250;
let playerY = 250;
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
  door = loadImage("assets/door.png");
  poster = loadImage("assets/poster.png");
  boxes = loadImage("assets/box.png");
  chest = loadImage("assets/chest.png");
  bed = loadImage("assets/bed.png");
  cage = loadImage("assets/cage.png");

  // text box prload
  interact = loadImage("assets/interact.png");

  // sprite image preload
  spriteFront = loadImage("assets/spriteFront.png");
  spriteBack = loadImage("assets/spriteBack.png");
  spriteLeft = loadImage("assets/spriteLeft.png");
  spriteRight = loadImage("assets/spriteRight.png");

  // level preload
  room = loadStrings("assets/1-escape-room.txt");
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
    overBorder();
    interactRightBox();
  }
}

////////////////// display functions /////////////////////////////////

function displayGrid() {
  for (let y=0; y<gridDimensions; y++) {
    for (let x=0; x<gridDimensions; x++) {
      // floor
      if (grid[y][x] === "0") {
        image(ground, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      // wall
      if (grid[y][x] === "1") {
        image(wall, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      // door
      if (grid[y][x] === "2") {
        image(door, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      // bed **note: change to plant**
      if (grid[y][x] === "3") {
        image(bed, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      // cage
      if (grid[y][x] === "4") {
        image(cage, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      // chest
      if (grid[y][x] === "5") {
        image(chest, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      // poster
      if (grid[y][x] === "#") {
        image(poster, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      // boxes
      if (grid[y][x] === "*") {
        image(boxes, x*cellSize, y*cellSize, cellSize, cellSize);
      }
      //////////////////////
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
  if (playerState === "move") {
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

function overBorder() {
  // check if over left side
  if (playerX < 0+cellSize*2) {
    playerX = playerX + 5;
  }
  // check if over right side
  if (playerX > width-cellSize*2) {
    playerX = playerX - 5;
  }
  // check if over top
  if (playerY < 10+cellSize) {
    playerY = playerY + 10;
  }
  // check if over bottom
  if (playerY > height-cellSize*2) {
    playerY = playerY - 5;
  }
}

////////////////////////// Character interaction /////////////////////////////////////////

function interactChest() {
}

function interactRightBox() {
  if (playerX < 0+cellSize*2.5 && playerY < cellSize*1.5 && playerY < cellSize*2.5) {
    image(interact, playerX, playerY+30, 20, 10);
  }
}

function interactWrongBox() {

}

function interactPoster() {

}

function interactCage() {

}

function interactDoor() {

}

//////////////////////////////////////////////////////////////////////////////////////////

function displayText() {
  if (textState === "right-chest") {
    image(title, width/2, height /2, 200, 100);
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


//////////////////////////////////////////////////////////////////////////////