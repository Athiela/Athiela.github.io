// Escape Room
// Athiela A.

///////////////////////// Global variables ////////////////////////////////////////

// music variable
let music;

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
let hasFood = "no";
let isFed = "not-fed";
let hasKey = "no";

// text-box variables
let textBoxEmpty, textBoxItem, textChest, textDoorHasKey, textDoorNoKey, textFeedHamster, textHamsterFed, textHamsterHideItem, textHamsterNoFood, textPlant, textGetItemFood, textGetItemKey;
let xTextBox, yTextBox, textBoxWidth, textBoxHeight;


// state variables
let state = "start";
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

  // end preload
  youWin = loadImage("assets/youEscaped.png");
  pressEnter = loadImage("assets/pressEnter.png");

  // tile preload
  ground = loadImage("assets/floor.png");
  wall = loadImage("assets/wall.png");
  door = loadImage("assets/door.png");
  poster = loadImage("assets/poster.png");
  boxes = loadImage("assets/box.png");
  chest = loadImage("assets/chest.png");
  bed = loadImage("assets/bed.png");
  cage = loadImage("assets/cage.png");

  // text box preload
  interact = loadImage("assets/interact.png");
  textBoxEmpty = loadImage("assets/text-boxempty.png");
  textBoxItem = loadImage("assets/text-boxitem.png");
  textChest = loadImage("assets/text-chest.png");
  textDoorHasKey = loadImage("assets/text-doorhaskey.png");
  textDoorNoKey = loadImage("assets/text-doornokey.png");
  textFeedHamster = loadImage("assets/text-feedhamster.png");
  textHamsterFed = loadImage("assets/text-hamsterfed.png");
  textHamsterNoFood = loadImage("assets/text-hamsternofood.png");
  textPlant = loadImage("assets/text-plant.png");
  textGetItemFood = loadImage("assets/text-itemfood.png");
  textGetItemKey = loadImage("assets/text-itemkey.png");

  // sprite image preload
  spriteFront = loadImage("assets/spriteFront.png");
  spriteBack = loadImage("assets/spriteBack.png");
  spriteLeft = loadImage("assets/spriteLeft.png");
  spriteRight = loadImage("assets/spriteRight.png");

  // level preload
  room = loadStrings("assets/1-escape-room.txt");

  // music preload
  music = loadSound("assets/music.mp3");
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
  xPlayButton = width/3.5;
  yPlayButton = height/2;
  playButtonWidth = 350;
  playButtonHeight = 150;

  xTextBox = width/7;
  yTextBox = height/4;
  textBoxWidth = width/1.4;
  textBoxHeight = height/2.2;

  // music loop
  music.loop();
}

function draw() {
  background(220);
  gameState();
}

/////////////////// game state //////////////////////////////

function gameState() {
  // state - start screen
  if (state === "start") {
    background(100);

    image(title, width/3.5, 200, 350, 200);
    hoverStartButtons();
    pressPlay();
  }
  // state - walking around room
  if (state === "play") {
    displayGrid();
    characterMovement();
    overBorder();
    interactFurniture();
  }
  // state - check if you got item already or not
  if (state === "box-item") {
    displayGrid();
    exitText();
    boxItem();
  }
  // state - ask if you want to pick up food
  if (state === "food-get") {
    displayGrid();
    image(textBoxItem, xTextBox, yTextBox, textBoxWidth, textBoxHeight);
    foodGet();
  }
  // state - food acquired
  if (state === "food-pickup") {
    displayGrid();
    image(textGetItemFood, xTextBox, yTextBox, textBoxWidth, textBoxHeight);
    exitText();
  }
  // state - check if you fed the hamster yet or not
  if (state === "cage") {
    displayGrid();
    cageInteraction();
  }
  // state - ask to feed hamster
  if (state === "feed-hamster") {
    displayGrid();
    image(textFeedHamster, xTextBox, yTextBox, textBoxWidth, textBoxHeight);
    feedHamster();
  }
  // state - key acquired
  if (state === "key-pickup") {
    displayGrid();
    image(textGetItemKey, xTextBox, yTextBox, textBoxWidth, textBoxHeight);
    exitText();
  }
  // state - ask to use key
  if (state === "key-has") {
    displayGrid();
    image(textDoorHasKey, xTextBox, yTextBox, textBoxWidth, textBoxHeight);
    useKey();
  }
  // state - empty box dialogue
  if (state === "box-none") {
    displayGrid();
    exitText();
    image(textBoxEmpty, xTextBox, yTextBox, textBoxWidth, textBoxHeight);
  }
  // state - plant dialogue
  if (state === "plant") {
    displayGrid();
    exitText();
    image(textPlant, xTextBox, yTextBox, textBoxWidth, textBoxHeight);
  }
  // state - chest dialogue
  if (state === "chest") {
    displayGrid();
    exitText();
    image(textChest, xTextBox, yTextBox, textBoxWidth, textBoxHeight);
  }
  // state - check to see if you have key to door
  if (state === "door") {
    displayGrid();
    exitText();
    doorInteraction();
  }
  // state - you escaped!
  if (state === "you-win") {
    background(119, 65, 65);
    image(youWin, width/4, height/4, 400, 200);
    image(pressEnter, width/4, height/1.8, 400, 200);
    backToStart();
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
  // move character
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
  // keep facing whichever position 
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
  if (playerX < 0+cellSize*1.9) {
    playerX = playerX + 8;
  }
  // check if over right side
  if (playerX > width-cellSize*1.65) {
    playerX = playerX - speed;
  }
  // check if over top
  if (playerY < cellSize+12) {
    playerY = playerY + (speed+3);
  }
  // check if over bottom
  if (playerY > height-cellSize*1.7) {
    playerY = playerY - speed;
  }
}

////////////////////////// Character interaction /////////////////////////////////////////

function interactFurniture() {
  // interact with box with item
  if (playerX < cellSize*2 && playerY < cellSize*1.7 && spritePosition ==="left") {
    if (keyIsDown(13)) {
      state = "box-item";
    }
    image(interact, playerX, playerY-30, width/8, height/15);
  }
  // interact with cage
  else if (playerX < cellSize*2 && playerY < cellSize*2.7 && spritePosition ==="left") {
    if (keyIsDown(13)){
      state = "cage";
    }
    image(interact, playerX, playerY-30, width/8, height/15);
  }
  // interact with box without item
  else if (playerX < cellSize*2 && playerY < cellSize*3.7 && spritePosition ==="left") {
    if (keyIsDown(13)){
      state = "box-none";
    }
    image(interact, playerX, playerY-30, width/8, height/15);
  }
  // interact with plant
  else if (playerX < cellSize*2 && playerY < cellSize*4.7 && spritePosition ==="left") {
    if (keyIsDown(13)){
      state = "plant";
    }
    image(interact, playerX, playerY-30, width/8, height/15);
  }
  // interact with plant
  else if (playerX < cellSize*2.5 && playerY > height-cellSize*1.9 && spritePosition ==="back") {
    if (keyIsDown(13)){
      state = "plant";
    }
    image(interact, playerX, playerY-30, width/8, height/15);
  }
  // interact with box without item
  else if (playerX < cellSize*3.5 && playerY > height-cellSize*1.9 && spritePosition ==="back") {
    if (keyIsDown(13)){
      state = "box-none";
    }
    image(interact, playerX, playerY-30, width/8, height/15);
  }
  // interact with plant
  else if (playerX < cellSize*4.5 && playerY > height-cellSize*1.9 && spritePosition ==="back") {
    if (keyIsDown(13)){
      state = "plant";
    }
    image(interact, playerX, playerY-30, width/8, height/15);
  }
  // interact with box without item
  else if (playerX > width-cellSize*2 && playerY > height-cellSize*2.5 && spritePosition ==="right") {
    if (keyIsDown(13)){
      state = "box-none";
    }
    image(interact, playerX, playerY-30, width/8, height/15);
  }
  // interact with box without item
  else if (playerX > width-cellSize*2 && playerY > height-cellSize*3.5 && spritePosition ==="right") {
    if (keyIsDown(13)){
      state = "box-none";
    }
    image(interact, playerX, playerY-30, width/8, height/15);
  }
  // interact with chest
  else if (playerX > width-cellSize*2 && playerY > height-cellSize*4.5 && spritePosition ==="right") {
    if (keyIsDown(13)){
      state = "chest";
    }
    image(interact, playerX, playerY-30, width/8, height/15);
  }
  // interact with box without item
  else if (playerX > width-cellSize*2 && playerY > height-cellSize*5.5 && spritePosition ==="right") {
    if (keyIsDown(13)){
      state = "box-none";
    }
    image(interact, playerX, playerY-30, width/8, height/15);
  }
  // interact with door
  else if (playerX > cellSize*2.5 && playerX < cellSize*3.5 && playerY < cellSize+30 && spritePosition ==="forward") {
    if (keyIsDown(13)){
      state = "door";
    }
    image(interact, playerX, playerY-30, width/8, height/15);
  }
}

// exit text with escape key
function exitText() {
  if (keyIsDown(27)){
    state = "play";
  }
}

// ask to pick up food function
function foodGet() {
  if (keyIsDown(49)){
    state = "food-pickup";
    hasFood = "yes";
  }
  else if (keyIsDown(50)){
    state = "play";
  }
}

// ask to feed hamster function
function feedHamster() {
  if (keyIsDown(49)){
    state = "key-pickup";
    hasKey = "yes";
    isFed = "yes";
  }
  else if (keyIsDown(50)){
    state = "play";
  }
}

// check to see if you got item from box yet function
function boxItem() {
  if (hasFood === "no") {
    state = "food-get";
  }
  if (hasFood === "yes") {
    image(textBoxEmpty, xTextBox, yTextBox, textBoxWidth, textBoxHeight);
  }
}

// ask to use key function
function useKey() {
  if (keyIsDown(49)){
    state = "you-win";
  }
  else if (keyIsDown(50)){
    state = "play";
  }
}

// check to see if you fed the hamster yet function
function cageInteraction() {
  if (hasFood === "no" && isFed === "not-fed") {
    image(textHamsterNoFood, xTextBox, yTextBox, textBoxWidth, textBoxHeight);
    exitText();
  }
  else if (hasFood === "yes" && isFed === "not-fed") {
    state = "feed-hamster";
  }
  else if (isFed === "yes") {
    image(textHamsterFed, xTextBox, yTextBox, textBoxWidth, textBoxHeight);
    exitText();
  }
}

// check to see if you have a key function
function doorInteraction() {
  if (hasKey === "yes") {
    state = "key-has";
  }
  if (hasKey === "no") {
    image(textDoorNoKey, xTextBox, yTextBox, textBoxWidth, textBoxHeight);
    exitText();
  }
}

///////////////////////// Button hover and press /////////////////////////////////////////

function hoverStartButtons() {
  // hovering
  if (mouseX > xPlayButton && mouseX < xPlayButton + playButtonWidth && mouseY > yPlayButton && mouseY < yPlayButton + playButtonHeight) {
    image(hoverStartButton, xPlayButton, yPlayButton, playButtonWidth, playButtonHeight);
  }
  // not hovering
  else {
    image(startButton, xPlayButton, yPlayButton, playButtonWidth, playButtonHeight);
  }
}

function pressPlay() {
  if (mouseX > xPlayButton && mouseX < xPlayButton + playButtonWidth && mouseY > yPlayButton && mouseY < yPlayButton + playButtonHeight && mouseIsPressed) {
    state = "play";
  }
}

function backToStart() {
  if (keyIsDown(13)) {
    // state back to start
    state = "start";

    // restore
    hasFood = "no";
    isFed = "not-fed";
    hasKey = "no";
  }
}

//////////////////////////////////////////////////////////////////////////////