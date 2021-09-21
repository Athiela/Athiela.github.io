// Rock paper scissors game
// Athiela A.
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


//////////// Global Variables ///////////////////////////

let cardR, cardP, cardS, xCardR, yCardR, xCardP, yCardP, xCardS, yCardS, cardWidthRock, cardHR, cardWP, cardHP, cardWS, cardHS, title, rockFrame, paperFrame, scissorsFrame, playButton, howToPlayButton;

let state = "play";

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
  title = loadImage("assets/title.png");
  
  cardR = loadImage("assets/cardRock.png");
  cardP = loadImage("assets/cardPaper.png");
  cardS = loadImage("assets/cardScissors.png");
  
  rockFrame = loadImage("assets/frameRock.png");
  paperFrame = loadImage("assets/framePaper.png");
  scissorsFrame = loadImage("assets/frameScissors.png");
  
  playButton = loadImage("assets/playButton.png");
  howToPlayButton = loadImage("assets/howToPlayButton.png");
  
}

/////////////////// Setup //////////////////////////

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  xCardR = width/10;
  yCardR = height/2;
  
  xCardP = width/2;
  yCardP = height/2;
  
  xCardS = width/1.12;
  yCardS = height/2;
  cardWidthRock = width/6;
  cardHR = height/2.2;
  
  cardWP = width/6;
  cardHP = height/2.2;
  
  cardWS = width/6;
  cardHS = height/2.2;
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