// Rock paper scissors game
// Athiela A.
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//////////// Global Variables ///////////////////////////

let cardR, cardP, cardS, title, rockFrame, paperFrame, scissorsFrame, playButton, howToPlayButton;

let state = "start";

let cardWidthRock = 150;
let cardHR = 200;

let cardWP = 150;
let cardHP = 200;

let cardWS = 150;
let cardHS = 200;

let xCardR = 150;
let yCardR = 250;

let xCardP = 350;
let yCardP = 250;

let xCardS = 550;
let yCardS = 250;

let playButtonWidth = 200;
let howToPlayButtonWidth = 200;
let playButtonHeight = 100;
let howToPlayButtonHeight = 100;

let rockHover = false;
let paperHover = false;
let scissorsHover = false;
let playButtonHover = false;
let howToPlayButtonHover = false;

//////////// Load Images //////////////////////////

function preload() {
  title = loadImage("title.png");

  cardR = loadImage("cardR.png");
  cardP = loadImage("cardP.png");
  cardS = loadImage("cardS.png");

  rockFrame = loadImage("rockFrame.png");
  paperFrame = loadImage("paperFrame.png");
  scissorsFrame = loadImage("scissorsFrame.png");
  
  playButton = loadImage("playButton.png");
  howToPlayButton = loadImage("howToPlayButton.png");
  
}

/////////////////// Setup //////////////////////////

function setup() {
  createCanvas(700, 500);
  imageMode(CENTER);
}

function draw() {
  background(43);
  gameState();
  
}

/////////////// Game State //////////////////////////////

function gameState() {
  if (state === "start") {
    background(3);
    displayPlayButton();
    displayHowToPlayButton();
    displayStartTitle();

    hoverStartButtons();
    
  }
  if (state === "play") {
    hoverCards();
    displayCardR();
    displayCardP();
    displayCardS();
    
    displayTitle();
    displayRockFrame();
    displayPaperFrame();
    displayScissorsFrame();
  }
} 

////////// Display image functions /////////////////

function displayTitle() {
  image(title, width / 2, height / 7, 200, 100);
}

function displayCardR() {
  image(cardR, xCardR, yCardR, cardWidthRock, cardHR);
}

function displayCardP() {
  image(cardP, xCardP, yCardP, cardWP, cardHP);
}

function displayCardS() {
  image(cardS, xCardS, yCardS, cardWS, cardHS);
}

function displayRockFrame() {
  if (rockHover === true) {
    image(rockFrame, xCardR, yCardR, cardWidthRock + 50, cardHR + 50);
  }
}

function displayPaperFrame() {
  if (paperHover === true) {
    image(paperFrame, xCardP, yCardP, cardWP + 50, cardHP + 50);
  }
}

function displayScissorsFrame() {
  if (scissorsHover === true) {
    image(scissorsFrame, xCardS, yCardS, cardWS + 50, cardHS + 50);
  }
}
///////////// Game = Start Functions /////////////////////

function displayPlayButton() {
  image(playButton, width/2, height/1.7, playButtonWidth, playButtonHeight);
}
function displayHowToPlayButton() {
  image(howToPlayButton, width/2, height/1.2, howToPlayButtonWidth, howToPlayButtonHeight);
}
function displayStartTitle() {
  image(title, width / 2, height / 4, 400, 200);
}
function displayHoverPlayButton() {
  image(howToPlayButton, width/2, height/1.7, playButtonWidth, playButtonHeight);
}

function hoverPlayButton() {
  if (playButtonHover) {
    !displayPlayButton();
    displayHoverPlayButton(); 
  }
}
///////////// Game = Play Functions /////////////////////

function hoverCards() {
  if (
    mouseX > xCardR - cardWidthRock / 2 &&
    mouseX < xCardR + cardWidthRock / 2 &&
    mouseY > yCardR - cardHR / 2 &&
    mouseY < yCardR + cardHR / 2
  ) {
    rockHover = true;
  } 
  else {
    rockHover = false;
  }

  if (
    mouseX > xCardP - cardWP / 2 &&
    mouseX < xCardP + cardWP / 2 &&
    mouseY > yCardP - cardHP / 2 &&
    mouseY < yCardP + cardHP / 2
  ) {
    paperHover = true;
  } 
  else {
    paperHover = false;
  }

  if (
    mouseX > xCardS - cardWS / 2 &&
    mouseX < xCardS + cardWS / 2 &&
    mouseY > yCardS - cardHS / 2 &&
    mouseY < yCardS + cardHS / 2
  ) {
    scissorsHover = true;
  } 
  else {
    scissorsHover = false;
  }
}

function hoverStartButtons() {
  if (
    mouseX > width/2 - playButtonWidth / 2 &&
    mouseX < width/2 + playButtonWidth / 2 &&
    mouseY > yCardS - playButtonHeight / 2 &&
    mouseY < yCardS + playButtonHeight / 2
  ) {
    playButtonHover = true;
  } 
  else {
    playButtonHover = false;
  }
}